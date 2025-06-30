import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RegisterModal, VerifyEmailModal } from '../components/auth';
import { LoginModal } from '../components/auth/LoginModal';
import { useAuth } from '../contexts/AuthContext';
import { stripeService } from '../services/stripeService';
import { products } from '../stripe-config';
import toast from 'react-hot-toast';

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  icon: React.ElementType;
  color: string;
  planId: 'free' | 'pro' | 'enterprise';
  priceId?: string;
}

const PricingCard: React.FC<{ 
  tier: PricingTier; 
  index: number; 
  onSelectPlan: (planId: string, priceId?: string) => void;
  isLoading: boolean;
}> = ({ 
  tier, 
  index, 
  onSelectPlan,
  isLoading 
}) => {
  const Icon = tier.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
        tier.popular ? 'border-blue-500 scale-105' : 'border-gray-200'
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <div className={`w-16 h-16 ${tier.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon size={32} className="text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
        <p className="text-gray-600 mb-6">{tier.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
          {tier.price !== 'Free' && <span className="text-gray-600">/month</span>}
        </div>

        <Button 
          className={`w-full mb-8 ${tier.popular ? '' : 'variant-outline'}`}
          variant={tier.popular ? 'primary' : 'outline'}
          onClick={() => onSelectPlan(tier.planId, tier.priceId)}
          loading={isLoading}
          disabled={isLoading}
        >
          {tier.cta}
        </Button>
      </div>

      <div className="space-y-4">
        {tier.features.map((feature, featureIndex) => (
          <div key={featureIndex} className="flex items-start space-x-3">
            <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const Pricing: React.FC = () => {
  const { user } = useAuth();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'enterprise'>('free');
  const [registeredEmail, setRegisteredEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Get product data from stripe-config
  const proProduct = products.find(p => p.name === 'UnifiSign Pro');
  const enterpriseProduct = products.find(p => p.name === 'UnifiSign Enterprise');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for individuals getting started',
      icon: Star,
      color: 'bg-gray-500',
      cta: 'Get Started Free',
      planId: 'free',
      features: [
        '5 documents per month',
        '1 user account',
        'Basic templates',
        'Email support',
        'Standard security',
        '30-day document storage',
      ],
    },
    {
      name: 'Pro',
      price: `$${proProduct?.price || 29}`,
      description: 'Ideal for small practices and teams',
      icon: Zap,
      color: 'bg-blue-500',
      popular: true,
      cta: 'Start Pro Trial',
      planId: 'pro',
      priceId: proProduct?.priceId,
      features: [
        'Unlimited documents',
        'Up to 10 users',
        'Advanced templates',
        'Priority support',
        'Advanced security & compliance',
        'Unlimited document storage',
        'Custom branding',
        'API access',
        'Advanced analytics',
      ],
    },
    {
      name: 'Enterprise',
      price: `$${enterpriseProduct?.price || 99}`,
      description: 'For large organizations with complex needs',
      icon: Shield,
      color: 'bg-teal-500',
      cta: 'Start Enterprise Trial',
      planId: 'enterprise',
      priceId: enterpriseProduct?.priceId,
      features: [
        'Everything in Pro',
        'Unlimited users',
        'Custom integrations',
        'Dedicated support manager',
        'Advanced role management',
        'Single Sign-On (SSO)',
        'Custom workflows',
        'Audit logs',
        'White-label solution',
        'SLA guarantee',
      ],
    },
  ];

  const handleSelectPlan = async (planId: string, priceId?: string) => {
    const plan = planId as 'free' | 'pro' | 'enterprise';
    setSelectedPlan(plan);
    
    if (planId === 'free') {
      if (user) {
        // Already have free access, redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Show registration modal for free plan
        setIsRegisterModalOpen(true);
      }
      return;
    }

    if (!priceId) {
      toast.error('Product configuration error. Please try again.');
      return;
    }

    if (user) {
      // User is logged in, proceed with checkout
      await handleCheckout(priceId);
    } else {
      // User not logged in, show registration modal
      setIsRegisterModalOpen(true);
    }
  };

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      toast.error('Please log in to continue');
      return;
    }

    setIsLoading(true);
    
    try {
      const { url } = await stripeService.createCheckoutSession({
        price_id: priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing`,
        mode: 'subscription',
      });

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to start checkout process');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSuccess = (email: string, plan: string) => {
    setRegisteredEmail(email);
    setSelectedPlan(plan as 'free' | 'pro' | 'enterprise');
    setIsRegisterModalOpen(false);
    setIsVerifyEmailModalOpen(true);
  };

  const handleVerificationSuccess = async (plan: string) => {
    setIsVerifyEmailModalOpen(false);
    
    if (plan === 'free') {
      // Redirect to login for free plan
      setIsLoginModalOpen(true);
    } else {
      // For paid plans, redirect to login first, then checkout
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = async () => {
    setIsLoginModalOpen(false);
    
    // If user selected a paid plan, proceed with checkout
    if (selectedPlan !== 'free') {
      const product = products.find(p => 
        (selectedPlan === 'pro' && p.name === 'UnifiSign Pro') ||
        (selectedPlan === 'enterprise' && p.name === 'UnifiSign Enterprise')
      );
      
      if (product) {
        await handleCheckout(product.priceId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. All plans include our core security features 
              and healthcare compliance tools.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard 
              key={tier.name} 
              tier={tier} 
              index={index} 
              onSelectPlan={handleSelectPlan}
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: 'Is my data secure?',
                answer: 'Yes, we use bank-level encryption and are fully HIPAA compliant. Your data is stored securely and never shared.',
              },
              {
                question: 'Can I cancel anytime?',
                answer: 'Absolutely. You can cancel your subscription at any time with no cancellation fees.',
              },
              {
                question: 'Do you offer custom solutions?',
                answer: 'Yes, our Enterprise plan includes custom integrations and workflows tailored to your needs.',
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards through our secure Stripe integration.',
              },
            ].map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of healthcare professionals who trust UnifiSign
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => handleSelectPlan('free')}
              disabled={isLoading}
            >
              Start Your Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/contact'}
            >
              Schedule a Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        selectedPlan={selectedPlan}
        onSuccess={handleRegistrationSuccess}
      />

      <VerifyEmailModal
        isOpen={isVerifyEmailModalOpen}
        onClose={() => setIsVerifyEmailModalOpen(false)}
        email={registeredEmail}
        selectedPlan={selectedPlan}
        onSuccess={handleVerificationSuccess}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onShowVerification={(email) => {
          setRegisteredEmail(email);
          setIsLoginModalOpen(false);
          setIsVerifyEmailModalOpen(true);
        }}
      />
    </div>
  );
};
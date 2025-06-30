import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Shield,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import { stripeAPI } from '../services/stripeAPI';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

interface CheckoutFormData {
  email: string;
  name: string;
}

const CheckoutForm: React.FC<{ packageId: number }> = ({ packageId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CheckoutFormData>();

  const packageDetails = {
    1: { name: 'Free Plan', price: 0, description: 'Perfect for individuals' },
    2: { name: 'Pro Plan', price: 29, description: 'Perfect for small practices', icon: Zap },
    3: { name: 'Enterprise Plan', price: 99, description: 'For large organizations', icon: Shield },
  };

  const selectedPackage = packageDetails[packageId as keyof typeof packageDetails];

  useEffect(() => {
    if (user?.email) {
      setValue('email', user.email);
      setValue('name', user.name);
    }
  }, [user, setValue]);

  useEffect(() => {
    // Create payment intent when component mounts
    if (selectedPackage && selectedPackage.price > 0) {
      createPaymentIntent();
    }
  }, [packageId]);

  const createPaymentIntent = async () => {
    try {
      const response = await stripeAPI.createPaymentIntent({
        package_id: packageId,
        email: user?.email || '',
      });
      
      if (response.success) {
        setClientSecret(response.client_secret);
      }
    } catch (error: any) {
      console.error('Failed to create payment intent:', error);
      setPaymentError('Failed to initialize payment. Please try again.');
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentError('Payment system not ready. Please try again.');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        setPaymentError('Card information is required.');
        return;
      }

      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      });

      if (error) {
        setPaymentError(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent?.status === 'succeeded') {
        // Confirm payment with backend
        const confirmResponse = await stripeAPI.confirmPayment({
          payment_intent_id: paymentIntent.id,
          package_id: packageId,
        });

        if (confirmResponse.success) {
          toast.success('Payment successful! Welcome to UnifiSign!');
          navigate('/dashboard');
        } else {
          setPaymentError('Payment processed but subscription activation failed. Please contact support.');
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Package</h2>
          <p className="text-gray-600 mb-6">The selected package was not found.</p>
          <Button onClick={() => navigate('/pricing')}>
            Back to Pricing
          </Button>
        </div>
      </div>
    );
  }

  if (selectedPackage.price === 0) {
    // Free plan - redirect to dashboard
    useEffect(() => {
      navigate('/dashboard');
    }, [navigate]);
    return null;
  }

  const Icon = selectedPackage.icon || Star;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={20} className="mr-1" />
              Back to Pricing
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Purchase</h1>
            <p className="text-gray-600">Secure checkout powered by Stripe</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{selectedPackage.name}</h4>
                  <p className="text-sm text-gray-600">{selectedPackage.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${selectedPackage.price}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${selectedPackage.price}.00</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${selectedPackage.price}.00</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lock size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Secure Payment</span>
              </div>
              <p className="text-xs text-blue-800">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Information</h3>
            
            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 text-sm font-medium">Payment Error</p>
                    <p className="text-red-700 text-sm mt-1">{paymentError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Input
                  {...register('name', { required: 'Name is required' })}
                  label="Full Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                />

                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#374151',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                loading={isProcessing}
                disabled={!stripe || isProcessing}
                className="w-full py-3 text-lg"
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${selectedPackage.price}/month`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                You can cancel your subscription at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const Checkout: React.FC = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();

  if (!packageId || !['1', '2', '3'].includes(packageId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Package</h2>
          <p className="text-gray-600 mb-6">The selected package was not found.</p>
          <Button onClick={() => navigate('/pricing')}>
            Back to Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm packageId={parseInt(packageId)} />
    </Elements>
  );
};
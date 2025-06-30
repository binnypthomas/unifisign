import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: 'pro' | 'enterprise';
  userEmail: string;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: string;
  city: string;
  zipCode: string;
  country: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  plan,
  userEmail
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentForm>();

  const planDetails = {
    pro: {
      name: 'Pro Plan',
      price: 29,
      description: 'Perfect for small practices and teams',
      features: [
        'Unlimited documents',
        'Up to 10 users',
        'Advanced templates',
        'Priority support',
        'Advanced security & compliance'
      ]
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: 99,
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'Unlimited users',
        'Custom integrations',
        'Dedicated support manager',
        'Advanced role management'
      ]
    }
  };

  const selectedPlan = planDetails[plan];

  const onSubmit = async (data: PaymentForm) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      // In a real app, this would integrate with Stripe, PayPal, etc.
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setPaymentSuccess(true);
      toast.success('Payment successful! Welcome to UnifiSign Pro!');
      
      // Redirect to dashboard after success
      setTimeout(() => {
        onClose();
        window.location.href = '/dashboard';
      }, 2000);
      
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (paymentSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Payment Successful!" size="md">
        <div className="px-6 py-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle size={32} className="text-green-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to UnifiSign {selectedPlan.name}!
          </h3>
          
          <p className="text-gray-600 mb-6">
            Your subscription has been activated. You now have access to all {selectedPlan.name} features.
          </p>
          
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-green-800">
              A confirmation email has been sent to {userEmail}
            </p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Your Purchase" size="lg">
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedPlan.name}</h4>
                    <p className="text-sm text-gray-600">{selectedPlan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${selectedPlan.price}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${selectedPlan.price}.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>${selectedPlan.price}.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">What's included:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Lock size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Secure Payment</span>
              </div>
              <p className="text-xs text-blue-800">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    {...register('cardNumber', {
                      required: 'Card number is required',
                      pattern: {
                        value: /^[\d\s]{13,19}$/,
                        message: 'Invalid card number',
                      },
                    })}
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    onChange={(e) => {
                      e.target.value = formatCardNumber(e.target.value);
                    }}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                {errors.cardNumber && (
                  <p className="text-sm text-red-600 mt-1">{errors.cardNumber.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    {...register('expiryDate', {
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: 'Invalid expiry date (MM/YY)',
                      },
                    })}
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      e.target.value = formatExpiryDate(e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-red-600 mt-1">{errors.expiryDate.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    {...register('cvv', {
                      required: 'CVV is required',
                      pattern: {
                        value: /^\d{3,4}$/,
                        message: 'Invalid CVV',
                      },
                    })}
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.cvv && (
                    <p className="text-sm text-red-600 mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cardholder Name
                </label>
                <input
                  {...register('cardholderName', {
                    required: 'Cardholder name is required',
                  })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.cardholderName && (
                  <p className="text-sm text-red-600 mt-1">{errors.cardholderName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address
                </label>
                <input
                  {...register('billingAddress', {
                    required: 'Billing address is required',
                  })}
                  type="text"
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.billingAddress && (
                  <p className="text-sm text-red-600 mt-1">{errors.billingAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    {...register('city', {
                      required: 'City is required',
                    })}
                    type="text"
                    placeholder="San Francisco"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    {...register('zipCode', {
                      required: 'ZIP code is required',
                    })}
                    type="text"
                    placeholder="94105"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.zipCode && (
                    <p className="text-sm text-red-600 mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  {...register('country', {
                    required: 'Country is required',
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                </select>
                {errors.country && (
                  <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>
                )}
              </div>

              <Button
                type="submit"
                loading={isProcessing}
                className="w-full py-3 text-lg"
              >
                {isProcessing ? 'Processing Payment...' : `Pay $${selectedPlan.price}/month`}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                You can cancel your subscription at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
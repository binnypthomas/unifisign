import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, RotateCcw, CreditCard } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { authAPI } from '../../services/authAPI';
import { stripeService } from '../../services/stripeService';
import { products } from '../../stripe-config';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import toast from 'react-hot-toast';

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  selectedPlan?: 'free' | 'pro' | 'enterprise';
  onSuccess?: (plan: string) => void;
}

export const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  isOpen,
  onClose,
  email,
  selectedPlan = 'free',
  onSuccess
}) => {
  const navigate = useNavigate();
  const csrfReady = useCSRFToken();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verifyError, setVerifyError] = useState<string>('');
  const [verifySuccess, setVerifySuccess] = useState<string>('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isRedirectingToPayment, setIsRedirectingToPayment] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    
    // Clear any previous errors
    setVerifyError('');
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when all 4 digits are entered
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    
    if (pastedData.length === 4) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setVerifyError('');
      
      // Focus the last input
      inputRefs.current[3]?.focus();
      
      // Auto-submit
      handleVerifyOtp(pastedData);
    }
  };

  const createStripeCheckoutSession = async (packageId: number) => {
    try {
      console.log('Creating Stripe checkout session for package ID:', packageId);
      
      // Find the product based on package_id
      let product;
      if (packageId === 2) {
        product = products.find(p => p.name === 'UnifiSign Pro');
      } else if (packageId === 3) {
        product = products.find(p => p.name === 'UnifiSign Enterprise');
      }

      if (!product) {
        console.error('Product not found for package ID:', packageId);
        throw new Error('Product configuration error. Please contact support.');
      }

      console.log('Found product:', product);

      // Create Stripe checkout session via your backend API
      const response = await stripeService.createCheckoutSession({
        price_id: product.priceId,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/pricing`,
        mode: product.mode,
      });

      console.log('Stripe checkout session response:', response);

      if (!response.success) {
        throw new Error(response.message || 'Failed to create checkout session');
      }

      return response.url;
    } catch (error: any) {
      console.error('Checkout session creation error:', error);
      throw new Error(error.message || 'Failed to create checkout session');
    }
  };

  const handleVerifyOtp = async (otpCode: string) => {
    if (!csrfReady) {
      setVerifyError('System is initializing. Please wait a moment and try again.');
      return;
    }

    if (otpCode.length !== 4) {
      setVerifyError('Please enter all 4 digits of the verification code.');
      return;
    }

    setIsLoading(true);
    setVerifyError('');
    setVerifySuccess('');

    try {
      console.log('Verifying OTP for email:', email, 'OTP:', otpCode);
      const response = await authAPI.verifyOTP(email, otpCode);
      console.log('OTP verification response:', response);
      
      if (response.success) {
        setVerifySuccess('Email verified successfully!');
        toast.success('Email verified successfully!');
        
        // Check if payment is required based on the 'next' field or payment_required flag
        const needsPayment = response.next === 'redirect_to_payment' || response.payment_required;
        const packageId = response.package_id;
        
        console.log('Payment needed:', needsPayment, 'Package ID:', packageId);
        
        if (needsPayment && packageId && packageId > 1) {
          setIsRedirectingToPayment(true);
          setVerifySuccess('Email verified! Redirecting to payment...');
          
          try {
            console.log('Creating checkout session for package:', packageId);
            // Create Stripe checkout session using your backend API
            const checkoutUrl = await createStripeCheckoutSession(packageId);
            console.log('Checkout URL created:', checkoutUrl);
            
            // Close modal and redirect to Stripe
            setTimeout(() => {
              onClose();
              console.log('Redirecting to Stripe checkout:', checkoutUrl);
              window.location.href = checkoutUrl;
            }, 2000);
          } catch (checkoutError: any) {
            console.error('Checkout error:', checkoutError);
            setIsRedirectingToPayment(false);
            setVerifyError('Failed to create checkout session. Please try again or contact support.');
            setVerifySuccess('');
            toast.error('Failed to redirect to payment. Please try again.');
          }
        } else {
          // Free plan - redirect to login or success
          setVerifySuccess('Email verified! You can now sign in.');
          
          setTimeout(() => {
            onClose();
            onSuccess?.(selectedPlan);
          }, 1500);
        }
      } else {
        setVerifyError('Invalid verification code. Please check your email and try again.');
        // Clear the OTP inputs
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage && errorMessage.includes('expired')) {
        setVerifyError('Verification code has expired. Please request a new one.');
      } else if (errorMessage && errorMessage.includes('invalid')) {
        setVerifyError('Invalid verification code. Please check your email and try again.');
      } else {
        setVerifyError(errorMessage || 'Verification failed. Please try again.');
      }
      
      // Clear the OTP inputs on error
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!csrfReady || resendCooldown > 0) return;

    setIsResending(true);
    setVerifyError('');

    try {
      const response = await authAPI.triggerVerificationCode(email);
      
      if (response.success) {
        toast.success('New verification code sent to your email!');
        setResendCooldown(60); // 60 second cooldown
        // Clear current OTP
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        setVerifyError('Failed to resend verification code. Please try again.');
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setVerifyError('Failed to resend verification code. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    setOtp(['', '', '', '']);
    setVerifyError('');
    setVerifySuccess('');
    setIsRedirectingToPayment(false);
    onClose();
  };

  const handleManualVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      handleVerifyOtp(otpCode);
    } else {
      setVerifyError('Please enter all 4 digits of the verification code.');
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case 'pro':
        return { name: 'Pro Plan', price: '$29/month', requiresPayment: true };
      case 'enterprise':
        return { name: 'Enterprise Plan', price: '$99/month', requiresPayment: true };
      default:
        return { name: 'Free Plan', price: 'Free', requiresPayment: false };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Verify Your Email" size="sm">
      <div className="px-6 py-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Mail size={32} className="text-blue-600" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Check Your Email
          </h3>
          <p className="text-sm text-gray-600">
            We've sent a 4-digit verification code to
          </p>
          <p className="text-sm font-medium text-gray-900 mt-1">{email}</p>
        </div>

        {/* Plan Info */}
        <div className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-4 text-white text-center">
          <h4 className="font-semibold">{planDetails.name}</h4>
          <p className="text-sm opacity-90">{planDetails.price}</p>
          {planDetails.requiresPayment && (
            <div className="flex items-center justify-center space-x-1 mt-2 text-sm opacity-90">
              <CreditCard size={14} />
              <span>Payment required after verification</span>
            </div>
          )}
        </div>

        {/* Success Message */}
        {verifySuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-800 text-sm font-medium">{verifySuccess}</p>
                {isRedirectingToPayment && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      <span className="text-green-700 text-xs">Preparing payment page...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {verifyError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">Verification Failed</p>
                <p className="text-red-700 text-sm mt-1">{verifyError}</p>
              </div>
            </div>
          </div>
        )}

        {/* OTP Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Enter Verification Code
          </label>
          
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  digit 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                } ${verifyError ? 'border-red-300' : ''}`}
                disabled={isLoading || isRedirectingToPayment}
              />
            ))}
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Enter the 4-digit code sent to your email
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleManualVerify}
          loading={isLoading || isRedirectingToPayment}
          disabled={!isOtpComplete || !csrfReady || isLoading || isRedirectingToPayment}
          className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-medium py-3"
        >
          {isRedirectingToPayment ? 'Redirecting to Payment...' : 
           isLoading ? 'Verifying...' : 'Verify Email'}
        </Button>

        {/* Resend Code */}
        {!isRedirectingToPayment && (
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive the code?
            </p>
            
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={!csrfReady || isResending || resendCooldown > 0 || isLoading}
              loading={isResending}
              className="text-blue-600 hover:text-blue-800"
            >
              <RotateCcw size={16} className="mr-1" />
              {resendCooldown > 0 
                ? `Resend in ${resendCooldown}s` 
                : (isResending ? 'Sending...' : 'Resend Code')
              }
            </Button>
            
            <p className="text-xs text-gray-500">
              Check your spam folder if you don't see the email
            </p>
          </div>
        )}

        {/* Change Email */}
        {!isRedirectingToPayment && (
          <div className="text-center border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600">
              Wrong email address?{' '}
              <button
                type="button"
                onClick={handleClose}
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                disabled={isLoading}
              >
                Go back and change it
              </button>
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
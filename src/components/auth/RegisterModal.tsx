import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { authAPI } from '../../services/authAPI';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import toast from 'react-hot-toast';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: 'free' | 'pro' | 'enterprise';
  onSuccess?: (email: string, plan: string, password: string) => void;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({ 
  isOpen, 
  onClose, 
  selectedPlan = 'free',
  onSuccess 
}) => {
  const csrfReady = useCSRFToken();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string>('');
  const [registerSuccess, setRegisterSuccess] = useState<string>('');
  const [showLoginOption, setShowLoginOption] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<RegisterForm>();

  const planToPackageId: Record<string, number> = {
    free: 1,
    pro: 2,
    enterprise: 3
  };

  const onSubmit = async (data: RegisterForm) => {
    if (!csrfReady) {
      setRegisterError('System is initializing. Please wait a moment and try again.');
      return;
    }
    
    setIsLoading(true);
    setRegisterError('');
    setRegisterSuccess('');
    setShowLoginOption(false);

    try {
      const requested_package_id = planToPackageId[selectedPlan];
      
      // Step 1: Register the user with the selected plan
      const registerResponse = await authAPI.register({ 
        email: data.email, 
        password: data.password,
        requested_package_id: requested_package_id
      });

      if (registerResponse.success) {
        // Step 2: Trigger verification code
        const verificationResponse = await authAPI.triggerVerificationCode(data.email);
        
        if (verificationResponse.success) {
          setRegisterSuccess('Account created successfully! Redirecting to email verification...');
          toast.success('Registration successful! Please check your email for verification code.');
          
          // Wait a moment then redirect to verification
          setTimeout(() => {
            reset();
            onClose();
            onSuccess?.(data.email, selectedPlan, data.password);
          }, 1500);
        } else {
          setRegisterError('Account created but failed to send verification email. Please try again.');
        }
      } else {
        setRegisterError('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage === 'Email already exists') {
        setShowLoginOption(true);
        setRegisterError('An account with this email address already exists. You can sign in to your existing account instead.');
      } else if (errorMessage && errorMessage.toLowerCase().includes('email already exists')) {
        setShowLoginOption(true);
        setRegisterError('An account with this email address already exists. You can sign in to your existing account instead.');
      } else if (errorMessage && errorMessage.includes('already exists')) {
        setShowLoginOption(true);
        setRegisterError('An account with this email already exists. Please use a different email or sign in instead.');
      } else if (errorMessage && errorMessage.includes('email')) {
        setRegisterError('Please enter a valid email address.');
      } else if (errorMessage && errorMessage.includes('password')) {
        setRegisterError('Password does not meet requirements. Please choose a stronger password.');
      } else {
        setRegisterError(errorMessage || 'Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setRegisterError('');
    setRegisterSuccess('');
    setShowLoginOption(false);
    onClose();
  };

  const handleGoToLogin = () => {
    // Close this modal and trigger login modal
    handleClose();
    // You might want to emit an event or call a parent function to open login modal
    // For now, we'll just close this modal
  };

  const getPlanDetails = () => {
    switch (selectedPlan) {
      case 'pro':
        return {
          name: 'Pro Plan',
          price: '$29/month',
          description: 'Perfect for small practices and teams',
          color: 'from-blue-600 to-slate-600',
          packageId: 2
        };
      case 'enterprise':
        return {
          name: 'Enterprise Plan',
          price: '$99/month',
          description: 'For large organizations with complex needs',
          color: 'from-teal-600 to-blue-600',
          packageId: 3
        };
      default:
        return {
          name: 'Free Plan',
          price: 'Free',
          description: 'Perfect for individuals getting started',
          color: 'from-gray-500 to-gray-600',
          packageId: 1
        };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Your Account" size="md">
      <div className="px-6 py-6 space-y-6">
        {/* Selected Plan Info */}
        <div className={`bg-gradient-to-r ${planDetails.color} rounded-lg p-4 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{planDetails.name}</h3>
              <p className="text-sm opacity-90">{planDetails.description}</p>
              <p className="text-xs opacity-75 mt-1">Package ID: {planDetails.packageId}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{planDetails.price}</div>
              {selectedPlan !== 'free' && (
                <div className="text-sm opacity-90">Billed monthly</div>
              )}
            </div>
          </div>
        </div>

        {/* Logo and Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/UnifiSign_Logo.png" 
              alt="UnifiSign" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-slate-600 text-sm">
            {selectedPlan === 'free' 
              ? 'Start your free account today' 
              : 'Create your account to continue with checkout'
            }
          </p>
        </div>

        {/* Success Message */}
        {registerSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">{registerSuccess}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {registerError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">Registration Failed</p>
                <p className="text-red-700 text-sm mt-1">{registerError}</p>
                
                {/* Login Option for Existing Email */}
                {showLoginOption && (
                  <div className="mt-3">
                    <Button
                      type="button"
                      onClick={handleGoToLogin}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Sign In to Existing Account
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                type="text"
                placeholder="Enter your full name"
                className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                error={errors.name?.message}
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                error={errors.email?.message}
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: 'Password must contain uppercase, lowercase, and number',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                className="pl-10 pr-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                error={errors.password?.message}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <Input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match',
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                className="pl-10 pr-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                error={errors.confirmPassword?.message}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-start space-x-2">
              <input
                {...register('agreeToTerms', {
                  required: 'You must agree to the terms and conditions',
                })}
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                disabled={isLoading}
              />
              <label className="text-sm text-slate-600">
                I agree to the{' '}
                <a href="/terms-conditions" className="text-blue-600 hover:text-blue-800">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={!csrfReady || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-medium py-3"
          >
            {isLoading 
              ? 'Creating Account...'
              : (csrfReady 
                ? (selectedPlan === 'free' ? 'Create Free Account' : 'Continue to Payment')
                : 'Loading...'
              )
            }
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={handleGoToLogin}
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                disabled={isLoading}
              >
                Sign in instead
              </button>
            </p>
          </div>
        </form>

        {/* Security Notice */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-900">
            🔒 Your information is protected with bank-level encryption and HIPAA compliance.
          </p>
        </div>
      </div>
    </Modal>
  );
};
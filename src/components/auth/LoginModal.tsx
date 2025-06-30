import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '../../contexts/AuthContext';
import { useCSRFToken } from '../../hooks/useCSRFToken';
import { authAPI } from '../../services/authAPI';
import toast from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowVerification?: (email: string) => void;
}

interface LoginForm {
  email: string;
  password: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onShowVerification }) => {
  const { login } = useAuth();
  const csrfReady = useCSRFToken();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const [loginSuccess, setLoginSuccess] = useState<string>('');
  const [showVerificationOption, setShowVerificationOption] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string>('');
  const [isResendingVerification, setIsResendingVerification] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    if (!csrfReady) {
      setLoginError('System is initializing. Please wait a moment and try again.');
      return;
    }

    setIsLoading(true);
    setLoginError('');
    setLoginSuccess('');
    setShowVerificationOption(false);

    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        setLoginSuccess('Login successful! Redirecting to dashboard...');
        reset();
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setLoginError('Login failed. Please check your credentials and try again.');
      }
    } catch (error: any) {
      console.error('Login error in modal:', error);
      
      // Handle specific error messages
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage === 'Account not verified') {
        setUnverifiedEmail(data.email);
        setShowVerificationOption(true);
        setLoginError('Your account is not verified. Please verify your email address to continue.');
      } else if (errorMessage === 'Invalid email or password') {
        setLoginError('The email or password you entered is incorrect. Please check your credentials and try again.');
      } else if (errorMessage && errorMessage.includes('verify')) {
        setUnverifiedEmail(data.email);
        setShowVerificationOption(true);
        setLoginError('Please verify your email address before signing in. Check your inbox for a verification link.');
      } else if (errorMessage && errorMessage.includes('password')) {
        setLoginError('The email or password you entered is incorrect. Please check your credentials and try again.');
      } else {
        setLoginError(errorMessage || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setLoginError('');
    setLoginSuccess('');
    setShowVerificationOption(false);
    setUnverifiedEmail('');
    onClose();
  };

  const handleResendVerification = async () => {
    if (!unverifiedEmail) return;

    setIsResendingVerification(true);
    setLoginError('');

    try {
      const response = await authAPI.triggerVerificationCode(unverifiedEmail);
      
      if (response.success) {
        toast.success('Verification code sent! Please check your email.');
        setLoginSuccess('Verification code sent to your email. Redirecting to verification...');
        
        // Wait a moment then redirect to verification
        setTimeout(() => {
          handleClose();
          if (onShowVerification) {
            onShowVerification(unverifiedEmail);
          }
        }, 1500);
      } else {
        setLoginError('Failed to send verification code. Please try again.');
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setLoginError('Failed to send verification code. Please try again.');
    } finally {
      setIsResendingVerification(false);
    }
  };

  const handleGoToVerification = () => {
    const email = unverifiedEmail || getValues('email');
    if (email && onShowVerification) {
      handleClose();
      onShowVerification(email);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In to UnifiSign" size="sm">
      <div className="px-6 py-6 space-y-6">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/UnifiSign_Logo.png" 
              alt="UnifiSign" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="text-slate-600 text-sm">Welcome back! Please sign in to your account.</p>
        </div>

        {/* Success Message */}
        {loginSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <p className="text-green-800 text-sm font-medium">{loginSuccess}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {loginError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 text-sm font-medium">Sign In Failed</p>
                <p className="text-red-700 text-sm mt-1">{loginError}</p>
                
                {/* Verification Options */}
                {showVerificationOption && (
                  <div className="mt-4 space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        type="button"
                        onClick={handleResendVerification}
                        loading={isResendingVerification}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                      >
                        {isResendingVerification ? 'Sending...' : 'Resend Verification Email'}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleGoToVerification}
                        size="sm"
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                      >
                        Enter Verification Code
                      </Button>
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      Already have a verification code? Click "Enter Verification Code" to verify your account.
                    </p>
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
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={!csrfReady || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-medium py-3"
          >
            {isLoading ? 'Signing In...' : (csrfReady ? 'Sign In' : 'Loading...')}
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
              onClick={() => {
                setLoginError('');
                setLoginSuccess('Password reset instructions will be sent to your email.');
              }}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <div className="text-center border-t border-slate-200 pt-4">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleClose}
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { stripeService } from '../services/stripeService';
import { subscriptionAPI } from '../services/subscriptionAPI';
import { getProductByPriceId } from '../stripe-config';
import toast from 'react-hot-toast';

export const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    if (!sessionId) {
      navigate('/pricing');
      return;
    }

    processSuccessfulPayment();
  }, [user, sessionId, navigate]);

  const processSuccessfulPayment = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Get session status using your specific endpoint with session_id parameter
      // This calls: GET /stripe/session-status?session_id=cs_test_...
      const subscription = await stripeService.getSubscription(sessionId!);
      
      if (subscription.success) {
        // Extract product info from session
        const priceId = subscription.price_id;
        const product = getProductByPriceId(priceId);
        setProductInfo(product);
        
        // Determine package_id based on product
        const packageId = product?.name === 'UnifiSign Pro' ? 2 : 3;
        
        // Call your backend to finalize subscription
        // POST /subscription/subscribe with the required payload
        const subscribeResponse = await subscriptionAPI.subscribe({
          package_id: packageId,
          plan: product?.name || 'Pro Plan',
          payment_id: sessionId!, // Stripe session ID as payment_id
        });
        
        if (subscribeResponse.success) {
          toast.success('Subscription activated successfully!');
          
          // Get updated subscription data
          const userSubscription = await stripeService.getUserSubscription();
          setSubscriptionData(userSubscription);
        } else {
          setError('Payment processed but subscription activation failed. Please contact support.');
        }
      } else {
        setError('Unable to retrieve payment details. Please contact support.');
      }
    } catch (error: any) {
      console.error('Error processing successful payment:', error);
      setError(error.message || 'There was an issue processing your payment. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Processing Issue</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate('/contact')}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Processing your subscription...</h2>
          <p className="text-gray-600">Please wait while we set up your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to UnifiSign {productInfo?.name?.replace('UnifiSign ', '') || 'Pro'}!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your subscription has been successfully activated. You now have access to all premium features.
          </p>

          {/* Subscription Details */}
          {subscriptionData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-600">Plan</p>
                  <p className="font-medium text-gray-900">{subscriptionData.plan || productInfo?.name || 'Premium Plan'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium text-green-600 capitalize">
                    {subscriptionData.status?.replace('_', ' ') || 'Active'}
                  </p>
                </div>
                
                {subscriptionData.renewal_date && (
                  <div>
                    <p className="text-sm text-gray-600">Next Billing Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(subscriptionData.renewal_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="font-medium text-gray-900">
                    ${subscriptionData.amount || productInfo?.price || '29'}.00 / month
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-blue-50 rounded-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Explore Your Dashboard</h4>
                  <p className="text-sm text-blue-700">Access all your premium features and tools</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Create Your First Template</h4>
                  <p className="text-sm text-blue-700">Start building professional document workflows</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900">Invite Your Team</h4>
                  <p className="text-sm text-blue-700">Add team members and start collaborating</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="group"
            >
              Go to Dashboard
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Contact Support
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600">
              A confirmation email has been sent to <strong>{user.email}</strong>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              You can manage your subscription and billing from your dashboard at any time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
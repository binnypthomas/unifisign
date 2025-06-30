import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={40} className="text-red-600" />
          </div>

          {/* Error Code */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl font-bold text-gray-900 mb-4"
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The resource you are trying to access is not found. The page you're looking for 
              doesn't exist or has been moved.
            </p>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
          >
            <p className="text-blue-900 text-sm">
              Redirecting to home page in{' '}
              <span className="font-bold text-blue-600">{countdown}</span> seconds...
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <motion.div
                className="bg-blue-600 h-2 rounded-full"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              onClick={handleGoHome}
              className="group"
            >
              <Home size={16} className="mr-2" />
              Go to Home Page
            </Button>
            
            <Button
              variant="outline"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 mb-2">
              Need help? Here are some useful links:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
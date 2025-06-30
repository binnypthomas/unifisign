import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginModal } from '../auth/LoginModal';
import { VerifyEmailModal } from '../auth/VerifyEmailModal';

export const FloatingLogin: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string>('');

  if (user) return null;

  const handleShowVerification = (email: string) => {
    setVerificationEmail(email);
    setIsModalOpen(false);
    setIsVerifyEmailModalOpen(true);
  };

  const handleVerificationSuccess = () => {
    setIsVerifyEmailModalOpen(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <div className="relative group">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <User size={24} />
                <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                  !
                </div>
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="absolute -top-1 -right-1 bg-slate-500 hover:bg-slate-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              
              <div className="absolute bottom-full right-0 mb-2 bg-slate-900 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Sign in to access all features
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowVerification={handleShowVerification}
      />

      <VerifyEmailModal
        isOpen={isVerifyEmailModalOpen}
        onClose={() => setIsVerifyEmailModalOpen(false)}
        email={verificationEmail}
        selectedPlan="free"
        onSuccess={handleVerificationSuccess}
      />
    </>
  );
};
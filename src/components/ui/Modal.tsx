import React, { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-6xl'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Clicking here closes the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Modal Container - Centered and Responsive */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full h-full sm:h-auto sm:max-h-[95vh] ${sizeClasses[size]}`}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className="bg-white h-full sm:h-auto sm:rounded-xl shadow-xl border-0 sm:border border-slate-200 flex flex-col sm:max-h-[95vh]">
                {/* Header with close button */}
                <div className="px-4 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                  {title ? (
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  ) : (
                    <div></div> // Empty div to maintain flex layout
                  )}
                  <button
                    onClick={onClose}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                {/* Content - Scrollable on mobile and desktop */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
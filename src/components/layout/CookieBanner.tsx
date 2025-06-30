import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(allPreferences));
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    setPreferences(minimalPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalPreferences));
    setShowBanner(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
          >
            <div className="max-w-7xl mx-auto p-4">
              <div className="flex items-start space-x-4">
                <Cookie className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    We use cookies to enhance your experience
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    We use cookies to provide essential website functionality, analyze site usage, 
                    and assist in our marketing efforts. By continuing to use this site, you consent 
                    to our use of cookies.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={acceptAll} size="sm">
                      Accept All
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowSettings(true)}
                    >
                      <Settings size={16} />
                      Customize
                    </Button>
                    <Button variant="ghost" size="sm" onClick={rejectAll}>
                      Reject All
                    </Button>
                  </div>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Cookie Preferences"
        size="lg"
      >
        <div className="space-y-6">
          <p className="text-gray-600">
            Choose which cookies you want to accept. You can change these settings at any time.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Necessary Cookies</h4>
                <p className="text-sm text-gray-600">
                  Essential for the website to function properly. Cannot be disabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Analytics Cookies</h4>
                <p className="text-sm text-gray-600">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Marketing Cookies</h4>
                <p className="text-sm text-gray-600">
                  Used to track visitors across websites to display relevant ads.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Functional Cookies</h4>
                <p className="text-sm text-gray-600">
                  Enable enhanced functionality and personalization.
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={acceptSelected} className="flex-1">
              Save Preferences
            </Button>
            <Button variant="outline" onClick={acceptAll} className="flex-1">
              Accept All
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
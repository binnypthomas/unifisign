import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Eye, Database, Settings, AlertTriangle } from 'lucide-react';

export const CookiePolicy: React.FC = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly',
      details: [
        'Authentication and session management',
        'Security and fraud prevention',
        'Load balancing and performance',
        'CSRF protection tokens',
        'User preferences and settings',
      ],
      retention: 'Session or up to 1 year',
      canDisable: false,
    },
    {
      icon: Eye,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website',
      details: [
        'Page views and user interactions',
        'Traffic sources and referrals',
        'Device and browser information',
        'Performance metrics',
        'Error tracking and debugging',
      ],
      retention: 'Up to 2 years',
      canDisable: true,
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      details: [
        'Language and region preferences',
        'Accessibility settings',
        'Form data persistence',
        'Chat widget functionality',
        'Video player preferences',
      ],
      retention: 'Up to 1 year',
      canDisable: true,
    },
    {
      icon: Database,
      title: 'Marketing Cookies',
      description: 'Used to track visitors for advertising purposes',
      details: [
        'Ad personalization and targeting',
        'Conversion tracking',
        'Social media integration',
        'Email marketing optimization',
        'Cross-site tracking prevention',
      ],
      retention: 'Up to 2 years',
      canDisable: true,
    },
  ];

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      cookies: '_ga, _ga_*, _gid, _gat',
      privacy: 'https://policies.google.com/privacy',
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      cookies: '__stripe_mid, __stripe_sid',
      privacy: 'https://stripe.com/privacy',
    },
    {
      name: 'Intercom',
      purpose: 'Customer support chat functionality',
      cookies: 'intercom-*',
      privacy: 'https://www.intercom.com/legal/privacy',
    },
    {
      name: 'Hotjar',
      purpose: 'User experience analytics and heatmaps',
      cookies: '_hjid, _hjFirstSeen, _hjIncludedInPageviewSample',
      privacy: 'https://www.hotjar.com/legal/policies/privacy/',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Cookie size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cookie Policy</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Learn about how we use cookies and similar technologies to provide and improve our services.
          </p>
          <p className="text-sm text-slate-500 mt-4">
            Last updated: January 15, 2025
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Are Cookies?</h2>
          <p className="text-slate-600 mb-4">
            Cookies are small text files that are stored on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences, 
            keeping you signed in, and helping us understand how you use our platform.
          </p>
          <p className="text-slate-600">
            We use both first-party cookies (set by UnifiSign) and third-party cookies (set by our partners) 
            to enhance functionality, analyze usage, and provide personalized experiences.
          </p>
        </motion.div>

        {/* Cookie Types */}
        <div className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 text-center">Types of Cookies We Use</h2>
          
          {cookieTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{type.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          type.canDisable 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {type.canDisable ? 'Optional' : 'Required'}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Used For:</h4>
                        <ul className="space-y-1">
                          {type.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                              <span className="text-sm text-slate-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Retention Period:</h4>
                        <p className="text-sm text-slate-600">{type.retention}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Third-Party Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Third-Party Services</h2>
          <p className="text-slate-600 mb-6">
            We work with trusted third-party services to provide enhanced functionality. 
            These services may set their own cookies when you use our platform.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <div key={service.name} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{service.purpose}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-medium text-slate-700">Cookies:</span>
                    <p className="text-xs text-slate-600 font-mono">{service.cookies}</p>
                  </div>
                  <a 
                    href={service.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Privacy Policy →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cookie Management */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-blue-50 rounded-lg border border-blue-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Managing Your Cookie Preferences</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Cookie Banner</h3>
              <p className="text-slate-600 text-sm">
                When you first visit our website, you'll see a cookie banner where you can accept all cookies, 
                reject non-essential cookies, or customize your preferences.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Browser Settings</h3>
              <p className="text-slate-600 text-sm">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside text-slate-600 text-sm mt-2 space-y-1">
                <li>View and delete existing cookies</li>
                <li>Block cookies from specific websites</li>
                <li>Block third-party cookies</li>
                <li>Clear all cookies when you close the browser</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Account Settings</h3>
              <p className="text-slate-600 text-sm">
                Logged-in users can manage cookie preferences from their account settings page.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Impact of Disabling Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-yellow-50 rounded-lg border border-yellow-200 p-8 mb-8"
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Impact of Disabling Cookies</h2>
              <p className="text-slate-600 mb-4">
                While you can disable non-essential cookies, please note that this may affect your experience:
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span>You may need to re-enter information more frequently</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span>Some features may not work as expected</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span>Personalized content and recommendations may be less relevant</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <span>We may not be able to remember your preferences</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Cookies?</h2>
          <p className="text-slate-600 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="space-y-2 text-slate-600">
            <p><strong>Email:</strong> privacy@unifisign.com</p>
            <p><strong>Phone:</strong> +49 151 701 33 555</p>
            <p><strong>Address:</strong> UnifiSign, Frankfurt, Germany</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
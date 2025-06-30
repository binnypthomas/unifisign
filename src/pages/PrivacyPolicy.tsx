import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Document content and metadata when you upload files for signing',
        'Usage data and analytics to improve our service',
        'Device and browser information for security purposes',
        'IP addresses and location data for fraud prevention',
      ],
    },
    {
      icon: Database,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our e-signature services',
        'To process and facilitate document signing workflows',
        'To communicate with you about your account and services',
        'To improve our platform and develop new features',
        'To ensure security and prevent fraudulent activities',
        'To comply with legal obligations and regulatory requirements',
      ],
    },
    {
      icon: UserCheck,
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share information with service providers who assist in our operations',
        'We may disclose information when required by law or to protect our rights',
        'Document signers receive only the information necessary to complete signing',
        'All third-party integrations are HIPAA-compliant and vetted for security',
      ],
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'All data is encrypted in transit and at rest using industry-standard encryption',
        'We maintain SOC 2 Type II and ISO 27001 certifications',
        'Regular security audits and penetration testing',
        'Multi-factor authentication and access controls',
        'Secure data centers with 24/7 monitoring',
        'Employee background checks and security training',
      ],
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        'Signed documents are retained according to your subscription plan',
        'Account information is kept for the duration of your account',
        'Audit logs are maintained for compliance and security purposes',
        'You can request deletion of your data at any time',
        'We comply with healthcare record retention requirements',
        'Backup data is securely deleted according to our retention schedule',
      ],
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: [
        'Access and review your personal information',
        'Request corrections to inaccurate data',
        'Request deletion of your personal information',
        'Export your data in a portable format',
        'Opt-out of non-essential communications',
        'File complaints with relevant data protection authorities',
      ],
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
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Your privacy is our priority. Learn how we collect, use, and protect your information.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
          <p className="text-slate-600 mb-4">
            UnifiSign ("we," "our," or "us") is committed to protecting your privacy and ensuring 
            the security of your personal information. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our e-signature platform.
          </p>
          <p className="text-slate-600 mb-4">
            As a healthcare-focused platform, we understand the critical importance of maintaining 
            the confidentiality and security of health information. We are fully HIPAA compliant 
            and follow industry best practices for data protection.
          </p>
          <p className="text-slate-600">
            By using UnifiSign, you agree to the collection and use of information in accordance 
            with this Privacy Policy.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-blue-50 rounded-lg border border-blue-200 p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
          <p className="text-slate-600 mb-4">
            If you have any questions about this Privacy Policy or our data practices, 
            please contact us:
          </p>
          <div className="space-y-2 text-slate-600">
            <p><strong>Email:</strong> privacy@unifisign.com</p>
            <p><strong>Phone:</strong> +49 151 701 33 555</p>
            <p><strong>Address:</strong> UnifiSign, frankfurt, Germany</p>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            We will respond to your inquiry within 30 days.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
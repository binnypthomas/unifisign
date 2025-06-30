import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, Users, CreditCard, Shield, AlertCircle } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  const sections = [
    {
      icon: Users,
      title: 'Account Terms',
      content: [
        'You must be at least 18 years old to use UnifiSign',
        'You are responsible for maintaining the security of your account',
        'You must provide accurate and complete information when creating an account',
        'One person or legal entity may not maintain more than one free account',
        'You are responsible for all activity that occurs under your account',
        'You must notify us immediately of any unauthorized use of your account',
      ],
    },
    {
      icon: FileText,
      title: 'Service Usage',
      content: [
        'UnifiSign provides electronic signature and document management services',
        'You may use our service only for lawful purposes and in accordance with these terms',
        'You retain ownership of all documents and content you upload to our platform',
        'We reserve the right to refuse service to anyone for any reason at any time',
        'Service availability is subject to maintenance windows and technical limitations',
        'You agree not to use the service for any illegal or unauthorized purpose',
      ],
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: [
        'Subscription fees are billed in advance on a monthly or annual basis',
        'All fees are non-refundable except as required by law',
        'We reserve the right to change our pricing with 30 days notice',
        'Failure to pay fees may result in suspension or termination of service',
        'You are responsible for all taxes associated with your use of the service',
        'Refunds are processed within 5-10 business days when applicable',
      ],
    },
    {
      icon: Shield,
      title: 'Data and Privacy',
      content: [
        'We are committed to protecting your privacy and data security',
        'Your use of the service is also governed by our Privacy Policy',
        'We comply with HIPAA, GDPR, and other applicable data protection laws',
        'You grant us permission to process your data as necessary to provide the service',
        'We will not access your documents except as necessary for service provision',
        'You are responsible for ensuring you have rights to upload and share documents',
      ],
    },
    {
      icon: Scale,
      title: 'Legal Compliance',
      content: [
        'Electronic signatures created through UnifiSign are legally binding',
        'You are responsible for compliance with applicable laws in your jurisdiction',
        'We provide audit trails and evidence to support legal validity of signatures',
        'You agree to indemnify us against claims arising from your use of the service',
        'These terms are governed by the laws of California, United States',
        'Any disputes will be resolved through binding arbitration',
      ],
    },
    {
      icon: AlertCircle,
      title: 'Limitations and Disclaimers',
      content: [
        'The service is provided "as is" without warranties of any kind',
        'We are not liable for any indirect, incidental, or consequential damages',
        'Our total liability is limited to the amount you paid for the service',
        'We do not guarantee uninterrupted or error-free service',
        'You use the service at your own risk and discretion',
        'We reserve the right to modify or discontinue the service at any time',
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
            <Scale size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Please read these terms carefully before using UnifiSign. By using our service, 
            you agree to be bound by these terms.
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
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
          <p className="text-slate-600 mb-4">
            These Terms and Conditions ("Terms") govern your use of UnifiSign's electronic signature 
            platform and services ("Service") operated by UnifiSign, Inc. ("us", "we", or "our").
          </p>
          <p className="text-slate-600 mb-4">
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
            with any part of these terms, then you may not access the Service.
          </p>
          <p className="text-slate-600">
            These Terms apply to all visitors, users, and others who access or use the Service, 
            including healthcare professionals, patients, and administrative staff.
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

        {/* Termination */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-orange-50 rounded-lg border border-orange-200 p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Termination</h2>
          <p className="text-slate-600 mb-4">
            We may terminate or suspend your account and bar access to the Service immediately, 
            without prior notice or liability, under our sole discretion, for any reason whatsoever 
            and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p className="text-slate-600 mb-4">
            If you wish to terminate your account, you may simply discontinue using the Service. 
            Upon termination, your right to use the Service will cease immediately.
          </p>
          <p className="text-slate-600">
            All provisions of the Terms which by their nature should survive termination shall 
            survive termination, including, without limitation, ownership provisions, warranty 
            disclaimers, indemnity and limitations of liability.
          </p>
        </motion.div>

        {/* Changes to Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-slate-50 rounded-lg border border-slate-200 p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to Terms</h2>
          <p className="text-slate-600 mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material, we will provide at least 30 days notice prior to any new terms 
            taking effect.
          </p>
          <p className="text-slate-600">
            What constitutes a material change will be determined at our sole discretion. By continuing 
            to access or use our Service after any revisions become effective, you agree to be bound 
            by the revised terms.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="bg-blue-50 rounded-lg border border-blue-200 p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h2>
          <p className="text-slate-600 mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="space-y-2 text-slate-600">
            <p><strong>Email:</strong> legal@unifisign.com</p>
            <p><strong>Phone:</strong> +49 151 701 33 555</p>
            <p><strong>Address:</strong> UnifiSign, Frankfurt, Germany</p>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            We will respond to your inquiry within 5 business days.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
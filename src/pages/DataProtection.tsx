import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Server, Key, AlertTriangle, CheckCircle } from 'lucide-react';

export const DataProtection: React.FC = () => {
  const protectionMeasures = [
    {
      icon: Lock,
      title: 'Encryption Standards',
      description: 'All data is protected with military-grade encryption',
      details: [
        'AES-256 encryption for data at rest',
        'TLS 1.3 for data in transit',
        'End-to-end encryption for sensitive documents',
        'Encrypted database storage',
        'Secure key management with HSM',
      ],
    },
    {
      icon: Server,
      title: 'Infrastructure Security',
      description: 'Enterprise-grade infrastructure with multiple security layers',
      details: [
        'SOC 2 Type II certified data centers',
        'ISO 27001 certified security management',
        '24/7 security monitoring and incident response',
        'Regular penetration testing and vulnerability assessments',
        'Redundant backup systems across multiple regions',
      ],
    },
    {
      icon: Key,
      title: 'Access Controls',
      description: 'Strict access controls and authentication mechanisms',
      details: [
        'Multi-factor authentication (MFA) required',
        'Role-based access control (RBAC)',
        'Principle of least privilege access',
        'Regular access reviews and audits',
        'Secure API authentication with OAuth 2.0',
      ],
    },
    {
      icon: Shield,
      title: 'HIPAA Compliance',
      description: 'Full compliance with healthcare data protection regulations',
      details: [
        'Business Associate Agreements (BAA) available',
        'Administrative, physical, and technical safeguards',
        'Regular HIPAA compliance audits',
        'Employee HIPAA training and certification',
        'Breach notification procedures in place',
      ],
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response',
      description: 'Comprehensive incident response and breach management',
      details: [
        '24/7 security operations center (SOC)',
        'Automated threat detection and response',
        'Incident response team with defined procedures',
        'Breach notification within 72 hours',
        'Forensic analysis and remediation capabilities',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Compliance & Auditing',
      description: 'Regular audits and compliance with international standards',
      details: [
        'Annual third-party security audits',
        'GDPR compliance for EU users',
        'CCPA compliance for California residents',
        'Regular internal security assessments',
        'Continuous compliance monitoring',
      ],
    },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', description: 'Security, availability, and confidentiality controls' },
    { name: 'ISO 27001', description: 'Information security management system' },
    { name: 'HIPAA Compliant', description: 'Healthcare data protection standards' },
    { name: 'GDPR Compliant', description: 'European data protection regulation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Data Protection</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive security measures to protect your sensitive healthcare data and ensure 
            compliance with industry regulations.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Data Protection</h2>
          <p className="text-slate-600 mb-4">
            At UnifiSign, data protection is not just a compliance requirement—it's fundamental to our mission. 
            We understand that healthcare organizations handle some of the most sensitive information, and we've 
            built our platform with security-first principles.
          </p>
          <p className="text-slate-600">
            Our comprehensive data protection strategy encompasses technical, administrative, and physical 
            safeguards designed to protect your data throughout its entire lifecycle, from creation to deletion.
          </p>
        </motion.div>

        {/* Protection Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {protectionMeasures.map((measure, index) => {
            const Icon = measure.icon;
            return (
              <motion.div
                key={measure.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{measure.title}</h3>
                    <p className="text-sm text-slate-600">{measure.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {measure.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-slate-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Security Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-slate-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Data Lifecycle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-slate-50 rounded-lg border border-slate-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Data Lifecycle Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Collection</h3>
              <p className="text-sm text-slate-600">
                Minimal data collection with explicit consent and purpose limitation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Processing</h3>
              <p className="text-sm text-slate-600">
                Secure processing with encryption, access controls, and audit logging
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Data Retention</h3>
              <p className="text-sm text-slate-600">
                Secure deletion according to retention policies and legal requirements
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-blue-50 rounded-lg border border-blue-200 p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Security Questions?</h2>
          <p className="text-slate-600 mb-4">
            Our security team is available to answer any questions about our data protection measures 
            or to provide additional documentation for your compliance requirements.
          </p>
          <div className="space-y-2 text-slate-600">
            <p><strong>Security Team:</strong> security@unifisign.com</p>
            <p><strong>Compliance Team:</strong> compliance@unifisign.com</p>
            <p><strong>Emergency Security Hotline:</strong> +1 (555) 123-SECURITY</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
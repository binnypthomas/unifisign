import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Users,
  Shield,
  Zap,
  Settings,
  CreditCard
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: Zap },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'templates', name: 'Templates', icon: Settings },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  const faqs = [
    {
      id: 'what-is-unifisign',
      category: 'getting-started',
      question: 'What is UnifiSign and how does it work?',
      answer: 'UnifiSign is a secure e-signature platform designed specifically for healthcare professionals. It allows you to create templates, send documents for signing, and collect signatures electronically while maintaining HIPAA compliance. Our platform combines PDF documents with interactive checklists for comprehensive data collection.',
    },
    {
      id: 'getting-started-guide',
      category: 'getting-started',
      question: 'How do I get started with UnifiSign?',
      answer: 'Getting started is easy! First, create your free account and verify your email. Then, you can create your first template by uploading a PDF or building a checklist. Once your template is ready, generate a signing link and share it with your patients or clients. Our dashboard provides real-time tracking of all your documents.',
    },
    {
      id: 'template-types',
      category: 'templates',
      question: 'What types of templates can I create?',
      answer: 'UnifiSign supports three types of templates: 1) Document Templates (PDF files for signatures), 2) Checklist Templates (interactive forms with various field types), and 3) Hybrid Templates (combining PDFs with checklists). Each type serves different workflow needs and can be customized with conditional logic and validation rules.',
    },
    {
      id: 'hipaa-compliance',
      category: 'security',
      question: 'Is UnifiSign HIPAA compliant?',
      answer: 'Yes, UnifiSign is fully HIPAA compliant. We implement administrative, physical, and technical safeguards to protect patient health information. Our platform uses bank-level encryption, secure data centers, and comprehensive audit trails. We also provide Business Associate Agreements (BAA) for healthcare organizations.',
    },
    {
      id: 'pricing-plans',
      category: 'billing',
      question: 'What are the different pricing plans?',
      answer: 'We offer three plans: Free (5 documents/month, 1 user), Pro ($29/month, unlimited documents, up to 10 users), and Enterprise ($99/month, unlimited everything plus advanced features). Free users can create 1 checklist and 1 template, while paid plans have no limits.',
    },
    {
      id: 'user-roles',
      category: 'users',
      question: 'What are the different user roles?',
      answer: 'UnifiSign has four user roles: 1) Super Admin (full access), 2) Admin (manage users and settings), 3) User (create and manage documents), and 4) Guest (limited access, typically free users). Each role has specific permissions and capabilities within the platform.',
    },
    {
      id: 'document-security',
      category: 'security',
      question: 'How secure are my documents?',
      answer: 'Your documents are protected with military-grade AES-256 encryption both in transit and at rest. We maintain SOC 2 Type II certification and follow strict security protocols. All signing activities are logged with detailed audit trails including IP addresses, timestamps, and device information.',
    },
    {
      id: 'signing-process',
      category: 'documents',
      question: 'How does the signing process work?',
      answer: 'When you create a signing link, recipients receive a secure URL to access the document. They can review the content, fill out any required forms, and provide their digital signature. The process is tracked in real-time, and you receive notifications when documents are completed.',
    },
    {
      id: 'api-integration',
      category: 'getting-started',
      question: 'Can I integrate UnifiSign with my existing systems?',
      answer: 'Yes! UnifiSign provides a comprehensive REST API that allows you to integrate e-signature functionality into your existing applications. We also offer SDKs for popular programming languages and webhook support for real-time notifications.',
    },
    {
      id: 'data-export',
      category: 'documents',
      question: 'Can I export my data?',
      answer: 'Absolutely! You can export your data in various formats including PDF, CSV, and JSON. This includes signed documents, form responses, and audit trails. Enterprise customers also have access to bulk export features and automated data synchronization.',
    },
  ];

  const quickLinks = [
    {
      title: 'Getting Started Guide',
      description: 'Complete walkthrough for new users',
      icon: Zap,
      link: '/docs/getting-started',
    },
    {
      title: 'Template Creation',
      description: 'Learn how to build effective templates',
      icon: Settings,
      link: '/templates',
    },
    {
      title: 'API Documentation',
      description: 'Integrate UnifiSign with your apps',
      icon: Book,
      link: '/api-docs',
    },
    {
      title: 'Security & Compliance',
      description: 'HIPAA compliance and security features',
      icon: Shield,
      link: '/data-protection',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? '' : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Help Center</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to your questions and learn how to make the most of UnifiSign's 
            powerful e-signature platform.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.title}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{link.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{link.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <span>Learn more</span>
                    <ExternalLink size={14} className="ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Need More Help?</h4>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MessageCircle size={16} />
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail size={16} />
                    Email Support
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone size={16} />
                    Call Us
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Frequently Asked Questions
                  {searchTerm && (
                    <span className="text-base font-normal text-gray-600 ml-2">
                      ({filteredFaqs.length} results for "{searchTerm}")
                    </span>
                  )}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredFaqs.length === 0 ? (
                  <div className="p-8 text-center">
                    <HelpCircle size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse by category.
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                          {expandedFaq === faq.id ? (
                            <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronRight size={20} className="text-gray-500 flex-shrink-0" />
                          )}
                        </div>
                      </button>
                      
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-6"
                        >
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white text-center mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our support team is here to help you succeed with UnifiSign. Get in touch and we'll 
            respond as quickly as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <MessageCircle size={20} />
              Start Live Chat
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Mail size={20} />
              Email Support
            </Button>
          </div>
          <div className="mt-6 text-blue-100 text-sm">
            <p>Average response time: 2 hours • Available 24/7</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
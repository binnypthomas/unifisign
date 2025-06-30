import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  List, 
  Layers, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Clock, 
  Shield,
  Zap,
  Settings,
  Eye,
  Copy,
  Download,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Templates: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const templateTypes = [
    {
      icon: FileText,
      title: 'Document Templates',
      description: 'PDF documents that require signatures',
      features: [
        'Upload PDF files',
        'Define signature fields',
        'Set signing order',
        'Add form fields',
        'Custom branding'
      ],
      useCase: 'Perfect for contracts, agreements, and forms that need to be signed',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: List,
      title: 'Checklist Templates',
      description: 'Interactive forms with dynamic fields',
      features: [
        'Multiple field types',
        'Conditional logic',
        'Data validation',
        'Required fields',
        'Group organization'
      ],
      useCase: 'Ideal for patient intake forms, surveys, and data collection',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Layers,
      title: 'Hybrid Templates',
      description: 'Combine PDF documents with interactive checklists',
      features: [
        'PDF + Checklist',
        'Unified workflow',
        'Complete documentation',
        'Comprehensive data',
        'Single signing session'
      ],
      useCase: 'Best for complex workflows requiring both signatures and data collection',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Create Template',
      description: 'Design your template with documents and/or checklists',
      icon: Plus,
    },
    {
      step: 2,
      title: 'Configure Fields',
      description: 'Set up form fields, signature areas, and validation rules',
      icon: Settings,
    },
    {
      step: 3,
      title: 'Generate Links',
      description: 'Create signing links for single or multiple use',
      icon: Copy,
    },
    {
      step: 4,
      title: 'Track Progress',
      description: 'Monitor signing status and collect completed documents',
      icon: Eye,
    },
  ];

  const fieldTypes = [
    { name: 'Text Input', description: 'Single line text fields', icon: '📝' },
    { name: 'Textarea', description: 'Multi-line text areas', icon: '📄' },
    { name: 'Email', description: 'Email address validation', icon: '📧' },
    { name: 'Date/Time', description: 'Date and time pickers', icon: '📅' },
    { name: 'Radio Buttons', description: 'Single choice selection', icon: '🔘' },
    { name: 'Checkboxes', description: 'Multiple choice selection', icon: '☑️' },
    { name: 'Dropdown', description: 'Select from options', icon: '📋' },
    { name: 'Multi-Select', description: 'Multiple option selection', icon: '📊' },
    { name: 'Groups', description: 'Organize related fields', icon: '📁' },
    { name: 'Conditional Fields', description: 'Show/hide based on responses', icon: '🔀' },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reuse templates instead of creating documents from scratch every time.',
    },
    {
      icon: Shield,
      title: 'Ensure Compliance',
      description: 'Standardize processes to meet healthcare regulations and requirements.',
    },
    {
      icon: Users,
      title: 'Improve Consistency',
      description: 'Maintain uniform documentation across your organization.',
    },
    {
      icon: Zap,
      title: 'Streamline Workflows',
      description: 'Automate document generation and signing processes.',
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'types', name: 'Template Types' },
    { id: 'workflow', name: 'How It Works' },
    { id: 'fields', name: 'Field Types' },
  ];

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
            <Layers size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Templates Guide</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Learn how to create powerful, reusable templates that combine documents and checklists 
            for streamlined healthcare workflows.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* What are Templates */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What are Templates?</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-gray-600 mb-6">
                      Templates in UnifiSign are reusable document structures that combine PDF documents 
                      and interactive checklists. They allow you to standardize your document workflows 
                      while maintaining flexibility for different use cases.
                    </p>
                    <p className="text-gray-600 mb-6">
                      Whether you need simple signature collection, complex data gathering, or both, 
                      templates provide a powerful foundation for your healthcare documentation needs.
                    </p>
                    <Button>
                      <Plus size={16} />
                      Create Your First Template
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-gray-900">Reusable across multiple documents</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-gray-900">Combine PDFs with interactive forms</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-gray-900">Support for conditional logic</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-gray-900">HIPAA compliant and secure</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle size={20} className="text-green-600" />
                        <span className="text-gray-900">Generate unlimited signing links</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use Templates?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div
                        key={benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'types' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Template Types</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choose the right template type for your specific workflow needs. Each type offers 
                  unique capabilities for different document scenarios.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {templateTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.div
                      key={type.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                      <div className={`bg-gradient-to-r ${type.color} p-6 text-white`}>
                        <Icon size={32} className="mb-4" />
                        <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                        <p className="text-blue-100">{type.description}</p>
                      </div>
                      
                      <div className="p-6">
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {type.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center space-x-2">
                                <CheckCircle size={16} className="text-green-600" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-700">
                            <strong>Best for:</strong> {type.useCase}
                          </p>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          Learn More
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'workflow' && (
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Template Workflow</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Follow these simple steps to create and deploy templates that streamline your 
                  document signing processes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {workflowSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{step.step}</span>
                        </div>
                        {index < workflowSteps.length - 1 && (
                          <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform -translate-x-8"></div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Detailed Workflow */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Process</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">1. Template Creation</h4>
                    <p className="text-gray-600 mb-3">
                      Start by choosing your template type: Document Only, Checklist Only, or Hybrid. 
                      Upload your PDF documents and design your interactive forms with our intuitive builder.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Upload PDF files or create from scratch</li>
                      <li>• Add form fields with validation rules</li>
                      <li>• Set up conditional logic for dynamic forms</li>
                      <li>• Configure required fields and signatures</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">2. Field Configuration</h4>
                    <p className="text-gray-600 mb-3">
                      Define how users interact with your template by setting up various field types, 
                      validation rules, and conditional visibility.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Choose from 10+ field types</li>
                      <li>• Set validation rules and error messages</li>
                      <li>• Create conditional field visibility</li>
                      <li>• Group related fields together</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">3. Link Generation</h4>
                    <p className="text-gray-600 mb-3">
                      Generate secure signing links for your templates. Choose between single-use links 
                      for specific individuals or multi-use links for broader distribution.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Single-use links for specific signers</li>
                      <li>• Multi-use links for multiple signers</li>
                      <li>• Set expiration dates and access controls</li>
                      <li>• Customize email notifications</li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-600 pl-6">
                    <h4 className="font-semibold text-gray-900 mb-2">4. Tracking & Management</h4>
                    <p className="text-gray-600 mb-3">
                      Monitor the progress of your documents in real-time. Track who has signed, 
                      when they signed, and download completed documents.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Real-time signing status updates</li>
                      <li>• Audit trails for compliance</li>
                      <li>• Automated notifications and reminders</li>
                      <li>• Secure document storage and retrieval</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fields' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Field Types</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Build comprehensive forms with our extensive collection of field types. 
                  Each field type is designed for specific data collection needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fieldTypes.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{field.icon}</span>
                      <h3 className="font-semibold text-gray-900">{field.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{field.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Advanced Features */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Advanced Field Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Conditional Logic</h4>
                    <p className="text-gray-600 mb-4">
                      Show or hide fields based on user responses. Create dynamic forms that adapt 
                      to user input for a more personalized experience.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> Show "Pregnancy Details" section only if user selects "Yes" 
                        for "Are you currently pregnant?"
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Validation Rules</h4>
                    <p className="text-gray-600 mb-4">
                      Ensure data quality with built-in validation rules. Set minimum/maximum values, 
                      required fields, and custom validation patterns.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> Validate email format, ensure phone numbers have correct 
                        format, or require specific date ranges.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Field Groups</h4>
                    <p className="text-gray-600 mb-4">
                      Organize related fields into logical groups for better user experience and 
                      easier form management.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> Group "Personal Information", "Medical History", 
                        and "Insurance Details\" into separate sections.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Data Export</h4>
                    <p className="text-gray-600 mb-4">
                      Export collected data in various formats including CSV, PDF, and JSON for 
                      integration with your existing systems.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <strong>Example:</strong> Export patient intake data directly to your EMR system 
                        or generate reports for compliance audits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your First Template?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start building powerful, reusable templates that will streamline your document workflows 
            and improve your team's efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Plus size={20} />
              Create Template
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Eye size={20} />
              View Examples
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
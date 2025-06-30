import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Book, 
  Key, 
  Shield, 
  Zap, 
  Copy, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const ApiDocs: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started']));
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const apiSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Base URL</h3>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
              https://api.unifisign.com/v1
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Authentication</h3>
            <p className="text-gray-600 mb-4">
              All API requests require authentication using an API key. Include your API key in the Authorization header:
            </p>
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span>Authorization: Bearer YOUR_API_KEY</span>
                <button 
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY')}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Rate Limiting</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle size={16} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-blue-900 text-sm font-medium">Rate Limits</p>
                  <ul className="text-blue-800 text-sm mt-1 space-y-1">
                    <li>• Free Plan: 100 requests per hour</li>
                    <li>• Pro Plan: 1,000 requests per hour</li>
                    <li>• Enterprise Plan: 10,000 requests per hour</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'authentication',
      title: 'Authentication',
      icon: Key,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">API Key Management</h3>
            <p className="text-gray-600 mb-4">
              Generate and manage your API keys from your dashboard settings. Keep your API keys secure and never expose them in client-side code.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generate API Key</h4>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2">
                    <div>POST /auth/api-keys</div>
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-4">"name": "My API Key",</div>
                    <div className="ml-4">"permissions": ["documents:read", "documents:write"]</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Response</h4>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-4">"success": true,</div>
                    <div className="ml-4">"api_key": "us_live_...",</div>
                    <div className="ml-4">"created_at": "2025-01-15T10:30:00Z"</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'documents',
      title: 'Documents API',
      icon: Book,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Document</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">POST</span>
                <code className="text-green-800">/documents</code>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Request Body</h4>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-1">
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-4">"title": "Patient Consent Form",</div>
                    <div className="ml-4">"template_id": "tpl_123456",</div>
                    <div className="ml-4">"signers": [</div>
                    <div className="ml-8">{`{`}</div>
                    <div className="ml-12">"email": "patient@example.com",</div>
                    <div className="ml-12">"name": "John Doe",</div>
                    <div className="ml-12">"role": "patient"</div>
                    <div className="ml-8">{`}`}</div>
                    <div className="ml-4">],</div>
                    <div className="ml-4">"metadata": {`{`}</div>
                    <div className="ml-8">"patient_id": "12345"</div>
                    <div className="ml-4">{`}`}</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Response</h4>
                <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-1">
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-4">"success": true,</div>
                    <div className="ml-4">"document_id": "doc_789012",</div>
                    <div className="ml-4">"signing_url": "https://app.unifisign.com/sign/...",</div>
                    <div className="ml-4">"status": "pending",</div>
                    <div className="ml-4">"created_at": "2025-01-15T10:30:00Z"</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Get Document Status</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">GET</span>
                <code className="text-blue-800">/documents/{`{document_id}`}</code>
              </div>
            </div>
            
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-gray-400">{`{`}</div>
                <div className="ml-4">"success": true,</div>
                <div className="ml-4">"document": {`{`}</div>
                <div className="ml-8">"id": "doc_789012",</div>
                <div className="ml-8">"title": "Patient Consent Form",</div>
                <div className="ml-8">"status": "completed",</div>
                <div className="ml-8">"signed_at": "2025-01-15T11:45:00Z",</div>
                <div className="ml-8">"download_url": "https://api.unifisign.com/..."</div>
                <div className="ml-4">{`}`}</div>
                <div className="text-gray-400">{`}`}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'templates',
      title: 'Templates API',
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Create Template</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">POST</span>
                <code className="text-green-800">/templates</code>
              </div>
            </div>
            
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-gray-400">{`{`}</div>
                <div className="ml-4">"name": "Patient Intake Form",</div>
                <div className="ml-4">"description": "Standard patient intake form",</div>
                <div className="ml-4">"fields": [</div>
                <div className="ml-8">{`{`}</div>
                <div className="ml-12">"type": "text",</div>
                <div className="ml-12">"name": "patient_name",</div>
                <div className="ml-12">"label": "Patient Name",</div>
                <div className="ml-12">"required": true</div>
                <div className="ml-8">{`}`}</div>
                <div className="ml-4">]</div>
                <div className="text-gray-400">{`}`}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">List Templates</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">GET</span>
                <code className="text-blue-800">/templates</code>
              </div>
            </div>
            
            <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-gray-400">{`{`}</div>
                <div className="ml-4">"success": true,</div>
                <div className="ml-4">"templates": [</div>
                <div className="ml-8">{`{`}</div>
                <div className="ml-12">"id": "tpl_123456",</div>
                <div className="ml-12">"name": "Patient Intake Form",</div>
                <div className="ml-12">"created_at": "2025-01-15T10:30:00Z"</div>
                <div className="ml-8">{`}`}</div>
                <div className="ml-4">],</div>
                <div className="ml-4">"total": 1</div>
                <div className="text-gray-400">{`}`}</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhook Events</h3>
            <p className="text-gray-600 mb-4">
              UnifiSign sends webhook events to notify your application when certain events occur.
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">document.signed</h4>
                <p className="text-sm text-gray-600 mb-3">Triggered when a document is successfully signed.</p>
                <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-2">"event": "document.signed",</div>
                    <div className="ml-2">"document_id": "doc_789012",</div>
                    <div className="ml-2">"signed_by": "patient@example.com",</div>
                    <div className="ml-2">"signed_at": "2025-01-15T11:45:00Z"</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">document.expired</h4>
                <p className="text-sm text-gray-600 mb-3">Triggered when a document expires without being signed.</p>
                <div className="bg-gray-900 text-green-400 rounded-lg p-3 font-mono text-xs">
                  <div className="space-y-1">
                    <div className="text-gray-400">{`{`}</div>
                    <div className="ml-2">"event": "document.expired",</div>
                    <div className="ml-2">"document_id": "doc_789012",</div>
                    <div className="ml-2">"expired_at": "2025-01-15T23:59:59Z"</div>
                    <div className="text-gray-400">{`}`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Webhook Security</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Shield size={16} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-yellow-900 text-sm font-medium">Verify Webhook Signatures</p>
                  <p className="text-yellow-800 text-sm mt-1">
                    Always verify webhook signatures using the X-UnifiSign-Signature header to ensure the request is from UnifiSign.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
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
            <Code size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">API Documentation</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Integrate UnifiSign's powerful e-signature capabilities into your applications with our comprehensive REST API.
          </p>
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg p-8 text-white mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get Started in Minutes</h2>
              <p className="text-blue-100 mb-6">
                Our RESTful API makes it easy to integrate e-signature functionality into your healthcare applications.
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" size="sm">
                  <Key size={16} />
                  Get API Key
                </Button>
                <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <ExternalLink size={16} />
                  View Examples
                </Button>
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
              <div className="text-green-400 space-y-1">
                <div className="text-gray-400"># Install our SDK</div>
                <div>npm install @unifisign/node-sdk</div>
                <div className="text-gray-400 mt-3"># Quick example</div>
                <div>const unifisign = require('@unifisign/node-sdk');</div>
                <div>unifisign.documents.create({`{...}`});</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">API Reference</h3>
              <nav className="space-y-2">
                {apiSections.map((section) => {
                  const Icon = section.icon;
                  const isExpanded = expandedSections.has(section.id);
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                        isExpanded
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={16} />
                        <span className="font-medium text-sm">{section.title}</span>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">SDKs & Libraries</h4>
                <div className="space-y-2">
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">Node.js SDK</a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">Python SDK</a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">PHP SDK</a>
                  <a href="#" className="block text-sm text-blue-600 hover:text-blue-800">Ruby SDK</a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {apiSections.map((section, index) => {
              const Icon = section.icon;
              const isExpanded = expandedSections.has(section.id);
              
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div 
                    className="p-6 border-b border-gray-200 cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon size={20} className="text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                      {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our developer support team is here to help you integrate UnifiSign successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <ExternalLink size={16} />
                Join Developer Discord
              </Button>
              <Button variant="outline">
                <Mail size={16} />
                Email Support
              </Button>
              <Button>
                <Book size={16} />
                View Tutorials
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
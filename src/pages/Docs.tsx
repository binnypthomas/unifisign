import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  FileText, 
  Code, 
  Zap, 
  Shield, 
  Users,
  ChevronRight,
  ExternalLink,
  Download,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Docs: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('overview');

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      icon: Book,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to UnifiSign Documentation</h2>
            <p className="text-gray-600 mb-6">
              UnifiSign is a comprehensive e-signature platform designed specifically for healthcare professionals. 
              Our documentation will help you understand how to use all features effectively and integrate 
              UnifiSign into your existing workflows.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">Creating and managing templates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">Document signing workflows</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">User management and permissions</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">API integration and webhooks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">Security and compliance features</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-blue-600" />
                    <span className="text-blue-800 text-sm">Best practices and troubleshooting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Zap size={24} className="text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quick Start</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get up and running with UnifiSign in minutes with our step-by-step guide.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Start Tutorial
                <ArrowRight size={14} />
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Code size={24} className="text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete API documentation with examples and SDKs for popular languages.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                View API Docs
                <ExternalLink size={14} />
              </Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <Play size={24} className="text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-sm text-gray-600 mb-4">
                Watch step-by-step video guides covering all major features and workflows.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Watch Videos
                <Play size={14} />
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started with UnifiSign</h2>
            <p className="text-gray-600 mb-6">
              This guide will walk you through the essential steps to start using UnifiSign effectively 
              for your healthcare document workflows.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Account Setup</h3>
              <p className="text-gray-600 mb-4">
                Create your UnifiSign account and complete the initial setup process.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Steps:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Sign up with your email address</li>
                  <li>• Verify your email through the confirmation link</li>
                  <li>• Complete your profile information</li>
                  <li>• Choose your subscription plan</li>
                  <li>• Set up your organization details</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-green-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Create Your First Template</h3>
              <p className="text-gray-600 mb-4">
                Templates are the foundation of your document workflows. Start by creating a simple template.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Template Types:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Document Only:</strong> PDF files for signature collection</li>
                  <li>• <strong>Checklist Only:</strong> Interactive forms with various field types</li>
                  <li>• <strong>Hybrid:</strong> Combine PDFs with interactive checklists</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-purple-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Generate Signing Links</h3>
              <p className="text-gray-600 mb-4">
                Once your template is ready, create secure signing links to share with your patients or clients.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Link Options:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• <strong>Single Use:</strong> For specific individuals with pre-filled information</li>
                  <li>• <strong>Multi Use:</strong> Reusable links for multiple signers</li>
                  <li>• Set expiration dates and access controls</li>
                  <li>• Customize email notifications and messages</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-orange-600 pl-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Monitor and Manage</h3>
              <p className="text-gray-600 mb-4">
                Track the progress of your documents and manage completed signatures through your dashboard.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Dashboard Features:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Real-time signing status updates</li>
                  <li>• Document download and storage</li>
                  <li>• Audit trails and compliance reports</li>
                  <li>• User activity and analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps</h3>
            <p className="text-blue-800 mb-4">
              Once you've completed the basic setup, explore these advanced features:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Advanced Features</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Conditional field logic</li>
                  <li>• Custom branding</li>
                  <li>• API integration</li>
                  <li>• Webhook notifications</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Team Management</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Add team members</li>
                  <li>• Set user permissions</li>
                  <li>• Organize workflows</li>
                  <li>• Monitor team activity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'templates',
      title: 'Templates',
      icon: FileText,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Template Documentation</h2>
            <p className="text-gray-600 mb-6">
              Learn how to create, customize, and manage templates effectively for your healthcare workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Template Creation</h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Document Templates</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Upload PDF files and define signature fields for document signing workflows.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Supported formats: PDF, DOC, DOCX</li>
                    <li>• Maximum file size: 10MB</li>
                    <li>• Signature field positioning</li>
                    <li>• Custom form fields</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Checklist Templates</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Build interactive forms with various field types and validation rules.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• 10+ field types available</li>
                    <li>• Conditional field logic</li>
                    <li>• Data validation rules</li>
                    <li>• Field grouping and organization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Types</h3>
              <div className="space-y-2">
                {[
                  'Text Input', 'Textarea', 'Email', 'Date/Time', 
                  'Radio Buttons', 'Checkboxes', 'Dropdown', 'Multi-Select'
                ].map((field, index) => (
                  <div key={field} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">{field}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Template Design</h4>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>• Keep forms concise and focused</li>
                  <li>• Use clear, descriptive field labels</li>
                  <li>• Group related fields together</li>
                  <li>• Test templates before deployment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">User Experience</h4>
                <ul className="space-y-1 text-sm text-yellow-800">
                  <li>• Minimize required fields</li>
                  <li>• Provide helpful instructions</li>
                  <li>• Use conditional logic wisely</li>
                  <li>• Ensure mobile compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'api',
      title: 'API Integration',
      icon: Code,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">API Integration Guide</h2>
            <p className="text-gray-600 mb-6">
              Integrate UnifiSign's e-signature capabilities into your existing applications using our REST API.
            </p>
          </div>

          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm">
            <div className="space-y-2">
              <div className="text-gray-400"># Base URL</div>
              <div>https://api.unifisign.com/v1</div>
              <div className="text-gray-400 mt-4"># Authentication</div>
              <div>Authorization: Bearer YOUR_API_KEY</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">1. Get API Key</h4>
                  <p className="text-sm text-gray-600">
                    Generate your API key from the dashboard settings page.
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">2. Install SDK</h4>
                  <div className="bg-gray-100 rounded p-2 font-mono text-xs">
                    npm install @unifisign/node-sdk
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">3. Make First Request</h4>
                  <p className="text-sm text-gray-600">
                    Create your first document using the API.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Available SDKs</h3>
              <div className="space-y-3">
                {[
                  { name: 'Node.js', status: 'Available' },
                  { name: 'Python', status: 'Available' },
                  { name: 'PHP', status: 'Available' },
                  { name: 'Ruby', status: 'Coming Soon' },
                  { name: 'Java', status: 'Coming Soon' },
                  { name: 'C#', status: 'Coming Soon' },
                ].map((sdk) => (
                  <div key={sdk.name} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                    <span className="text-sm font-medium text-gray-900">{sdk.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sdk.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {sdk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Common Use Cases</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">EMR Integration</h4>
                <p className="text-sm text-blue-700">
                  Automatically generate consent forms from patient records.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Workflow Automation</h4>
                <p className="text-sm text-blue-700">
                  Trigger document creation based on appointment scheduling.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Data Synchronization</h4>
                <p className="text-sm text-blue-700">
                  Sync signed documents back to your existing systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      icon: Shield,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security & Compliance</h2>
            <p className="text-gray-600 mb-6">
              UnifiSign is built with security-first principles and maintains strict compliance 
              with healthcare regulations including HIPAA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Features</h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Encryption</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• AES-256 encryption at rest</li>
                    <li>• TLS 1.3 for data in transit</li>
                    <li>• End-to-end encryption</li>
                    <li>• Secure key management</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Access Controls</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based permissions</li>
                    <li>• Session management</li>
                    <li>• IP whitelisting</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance</h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">HIPAA Compliance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Business Associate Agreements</li>
                    <li>• Administrative safeguards</li>
                    <li>• Physical safeguards</li>
                    <li>• Technical safeguards</li>
                  </ul>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SOC 2 Type II</li>
                    <li>• ISO 27001</li>
                    <li>• GDPR compliant</li>
                    <li>• CCPA compliant</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Audit & Monitoring</h3>
            <p className="text-green-800 mb-4">
              Every action in UnifiSign is logged and monitored for security and compliance purposes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-900 mb-2">Audit Trails</h4>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• Complete signing history</li>
                  <li>• IP address tracking</li>
                  <li>• Device fingerprinting</li>
                  <li>• Timestamp verification</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-900 mb-2">Monitoring</h4>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• 24/7 security monitoring</li>
                  <li>• Intrusion detection</li>
                  <li>• Anomaly detection</li>
                  <li>• Incident response</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'user-management',
      title: 'User Management',
      icon: Users,
      content: (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600 mb-6">
              Learn how to manage users, set permissions, and organize your team effectively within UnifiSign.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Super Admin</h4>
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Full Access</span>
                  </div>
                  <p className="text-sm text-gray-600">Complete system access and management capabilities.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Admin</h4>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">High Access</span>
                  </div>
                  <p className="text-sm text-gray-600">Manage users, settings, and organizational features.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">User</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Standard</span>
                  </div>
                  <p className="text-sm text-gray-600">Create and manage documents and templates.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Guest</h4>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Limited</span>
                  </div>
                  <p className="text-sm text-gray-600">Limited access, typically for free plan users.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions Matrix</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2">Feature</th>
                      <th className="text-center py-2">Admin</th>
                      <th className="text-center py-2">User</th>
                      <th className="text-center py-2">Guest</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Create Templates</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">⚠️</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Manage Users</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">❌</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">API Access</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">❌</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2">Billing Access</td>
                      <td className="text-center">✅</td>
                      <td className="text-center">❌</td>
                      <td className="text-center">❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ⚠️ Limited to 1 template for Guest users
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Team Management Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-purple-900 mb-2">User Onboarding</h4>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• Assign appropriate roles from the start</li>
                  <li>• Provide training on platform features</li>
                  <li>• Set up team templates and workflows</li>
                  <li>• Establish naming conventions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-purple-900 mb-2">Security Management</h4>
                <ul className="space-y-1 text-sm text-purple-700">
                  <li>• Regular access reviews</li>
                  <li>• Enforce strong password policies</li>
                  <li>• Enable multi-factor authentication</li>
                  <li>• Monitor user activity logs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const sidebarSections = [
    { id: 'overview', title: 'Overview', icon: Book },
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'templates', title: 'Templates', icon: FileText },
    { id: 'api', title: 'API Integration', icon: Code },
    { id: 'security', title: 'Security & Compliance', icon: Shield },
    { id: 'user-management', title: 'User Management', icon: Users },
  ];

  const currentSection = sections.find(s => s.id === selectedSection);

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
            <Book size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Documentation</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive guides and documentation to help you get the most out of UnifiSign's 
            powerful e-signature platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {sidebarSections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                        selectedSection === section.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="font-medium text-sm">{section.title}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a href="/api-docs" className="block text-sm text-blue-600 hover:text-blue-800">
                    API Reference
                  </a>
                  <a href="/help" className="block text-sm text-blue-600 hover:text-blue-800">
                    Help Center
                  </a>
                  <a href="/contact" className="block text-sm text-blue-600 hover:text-blue-800">
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {currentSection?.content}
            </div>
          </motion.div>
        </div>

        {/* Download Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-12"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-gray-600 mb-6">
              Download guides, templates, and other resources to help you succeed with UnifiSign.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Download size={24} className="text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Implementation Guide</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Step-by-step guide for implementing UnifiSign in your organization.
                </p>
                <Button variant="outline" size="sm">
                  Download PDF
                </Button>
              </div>
              <div className="text-center">
                <FileText size={24} className="text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Template Library</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pre-built templates for common healthcare workflows.
                </p>
                <Button variant="outline" size="sm">
                  Browse Templates
                </Button>
              </div>
              <div className="text-center">
                <Code size={24} className="text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Code Examples</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Sample code and integration examples for developers.
                </p>
                <Button variant="outline" size="sm">
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  List, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { publicAPI } from '../services/publicAPI';
import toast from 'react-hot-toast';

interface ChecklistItem {
  id: number;
  type: 'radio' | 'date_time' | 'select' | 'group' | 'text' | 'textarea' | 'checkbox' | 'multi-select' | 'email';
  text: string;
  name?: string;
  options?: Array<{ label: string; value: string }>;
  required: boolean;
  order: number;
  items?: ChecklistItem[];
  visibility_condition?: {
    field_name: string;
    operator: string;
    value: string;
  };
}

interface DocumentData {
  token: string;
  title: string;
  description: string;
  pdf_url?: string;
  signer_name: string;
  sign_type: 1 | 2 | 3;
  document_type: 1 | 2;
  checklist: ChecklistItem[];
}

export const SignLink: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());
  const [signatureData, setSignatureData] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (token) {
      loadDocumentData();
    }
  }, [token]);

  useEffect(() => {
    // Update visible fields based on responses and visibility conditions
    updateVisibleFields();
  }, [responses, documentData]);

  const loadDocumentData = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await publicAPI.getDocumentByToken(token!);
      setDocumentData(data);
      
      // Initialize visible fields
      const initialVisible = new Set<string>();
      data.checklist.forEach(item => {
        if (!item.visibility_condition) {
          initialVisible.add(item.name || `item_${item.id}`);
        }
        if (item.items) {
          item.items.forEach(subItem => {
            if (!subItem.visibility_condition) {
              initialVisible.add(subItem.name || `item_${subItem.id}`);
            }
          });
        }
      });
      setVisibleFields(initialVisible);
    } catch (error: any) {
      console.error('Failed to load document:', error);
      setError('Failed to load document. The link may be invalid or expired.');
      toast.error('Failed to load document');
    } finally {
      setIsLoading(false);
    }
  };

  const updateVisibleFields = () => {
    if (!documentData) return;

    const newVisibleFields = new Set<string>();

    const checkVisibility = (item: ChecklistItem) => {
      const fieldName = item.name || `item_${item.id}`;
      
      if (!item.visibility_condition) {
        newVisibleFields.add(fieldName);
      } else {
        const { field_name, operator, value } = item.visibility_condition;
        const fieldValue = responses[field_name];
        
        let isVisible = false;
        if (operator === 'equals') {
          isVisible = fieldValue === value;
        } else if (operator === 'contains') {
          isVisible = fieldValue && fieldValue.toString().includes(value);
        }
        
        if (isVisible) {
          newVisibleFields.add(fieldName);
        }
      }

      // Check sub-items for groups
      if (item.items) {
        item.items.forEach(checkVisibility);
      }
    };

    documentData.checklist.forEach(checkVisibility);
    setVisibleFields(newVisibleFields);
  };

  const toggleGroup = (itemId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return <FileText size={16} className="text-blue-600" />;
      case 'textarea':
        return <FileText size={16} className="text-green-600" />;
      case 'checkbox':
      case 'multi-select':
        return <CheckCircle size={16} className="text-purple-600" />;
      case 'radio':
      case 'select':
        return <List size={16} className="text-orange-600" />;
      case 'date_time':
        return <Calendar size={16} className="text-teal-600" />;
      case 'group':
        return <List size={16} className="text-slate-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const renderFormField = (item: ChecklistItem, depth: number = 0) => {
    const fieldName = item.name || `item_${item.id}`;
    const isVisible = visibleFields.has(fieldName);
    const isGroup = item.type === 'group';
    const isExpanded = expandedGroups.has(item.id);
    
    if (!isVisible && !isGroup) return null;

    if (isGroup) {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border border-gray-200 rounded-lg ${depth > 0 ? 'ml-6' : ''}`}
        >
          <div className="p-4">
            <button
              type="button"
              onClick={() => toggleGroup(item.id)}
              className="flex items-center space-x-3 w-full text-left hover:bg-gray-50 p-2 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown size={20} className="text-gray-500" />
              ) : (
                <ChevronRight size={20} className="text-gray-500" />
              )}
              {getFieldTypeIcon(item.type)}
              <span className="font-medium text-gray-900">{item.text}</span>
            </button>
            
            {isExpanded && item.items && (
              <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
                {item.items
                  .sort((a, b) => a.order - b.order)
                  .map(subItem => renderFormField(subItem, depth + 1))}
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`space-y-2 ${depth > 0 ? 'ml-6' : ''}`}
      >
        <div className="flex items-center space-x-2">
          {getFieldTypeIcon(item.type)}
          <label className="block text-sm font-medium text-gray-700">
            {item.text}
            {item.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {item.visibility_condition && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center space-x-1">
              <EyeOff size={10} />
              <span>Conditional</span>
            </span>
          )}
        </div>

        {/* Render different input types */}
        {item.type === 'text' && (
          <input
            type="text"
            value={responses[fieldName] || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={item.required}
          />
        )}

        {item.type === 'email' && (
          <input
            type="email"
            value={responses[fieldName] || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={item.required}
          />
        )}

        {item.type === 'textarea' && (
          <textarea
            value={responses[fieldName] || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            required={item.required}
          />
        )}

        {item.type === 'date_time' && (
          <input
            type="datetime-local"
            value={responses[fieldName] || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={item.required}
          />
        )}

        {item.type === 'select' && item.options && (
          <select
            value={responses[fieldName] || ''}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required={item.required}
          >
            <option value="">Please select...</option>
            {item.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {item.type === 'radio' && item.options && (
          <div className="space-y-2">
            {item.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  checked={responses[fieldName] === option.value}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  required={item.required}
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {item.type === 'checkbox' && item.options && (
          <div className="space-y-2">
            {item.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(responses[fieldName] || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValues = responses[fieldName] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter((v: string) => v !== option.value);
                    handleInputChange(fieldName, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {item.type === 'multi-select' && item.options && (
          <select
            multiple
            value={responses[fieldName] || []}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              handleInputChange(fieldName, values);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            size={Math.min(item.options.length, 5)}
            required={item.required}
          >
            {item.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </motion.div>
    );
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    const validateItem = (item: ChecklistItem) => {
      const fieldName = item.name || `item_${item.id}`;
      const isVisible = visibleFields.has(fieldName);
      
      if (isVisible && item.required) {
        const value = responses[fieldName];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          errors.push(`${item.text} is required`);
        }
      }

      if (item.items) {
        item.items.forEach(validateItem);
      }
    };

    documentData?.checklist.forEach(validateItem);
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(`Please fill in all required fields: ${validationErrors.join(', ')}`);
      return;
    }

    if (!signatureData) {
      toast.error('Please provide your signature');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get browser and device information
      const browserInfo = {
        ipAddress: '127.0.0.1', // This would normally be detected server-side
        browserSignature: navigator.userAgent,
        browserName: navigator.userAgent.split(' ')[0],
        isMobile: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 1 : 0,
        deviceType: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        deviceOs: navigator.platform,
      };

      const submitData = {
        token: token!,
        responses,
        signatureData,
        ...browserInfo,
      };

      const result = await publicAPI.submitSignedDocument(submitData);
      
      if (result.success) {
        toast.success('Document signed successfully!');
        // Redirect to a success page or download the signed document
        if (result.download_url) {
          window.open(result.download_url, '_blank');
        }
        navigate('/');
      } else {
        toast.error('Failed to submit document');
      }
    } catch (error: any) {
      console.error('Failed to submit document:', error);
      toast.error(error.response?.data?.message || 'Failed to submit document');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (!documentData) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-slate-700 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{documentData.title}</h1>
          {documentData.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">{documentData.description}</p>
          )}
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Shield size={16} />
              <span>Secure & Encrypted</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock size={16} />
              <span>Auto-saved</span>
            </span>
          </div>
        </motion.div>

        {/* PDF Document */}
        {documentData.pdf_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <FileText size={20} />
                <span>Document</span>
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(documentData.pdf_url, '_blank')}
              >
                <Eye size={16} />
                View Document
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">
                Please review the document before proceeding with the form below.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(documentData.pdf_url, '_blank')}
                className="text-blue-600 hover:text-blue-800"
              >
                <Download size={16} />
                Download PDF
              </Button>
            </div>
          </motion.div>
        )}

        {/* Checklist Form */}
        {documentData.checklist && documentData.checklist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <List size={20} />
                <span>Form</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Please fill out all required fields below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {documentData.checklist
                  .sort((a, b) => a.order - b.order)
                  .map(item => renderFormField(item))}
              </div>

              {/* Signature Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <User size={20} />
                  <span>Digital Signature</span>
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={signatureData}
                      onChange={(e) => setSignatureData(e.target.value)}
                      placeholder="Enter your full name as your digital signature"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-900">
                      By typing your name above, you agree that this constitutes your legal digital signature 
                      and has the same legal effect as a handwritten signature.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!signatureData}
                  className="w-full py-3 text-lg"
                >
                  {isSubmitting ? 'Submitting...' : 'Sign Document'}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  This document will be securely processed and stored. 
                  You will receive a copy upon completion.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};
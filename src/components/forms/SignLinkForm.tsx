import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Copy, ExternalLink, User, Users, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { documentAPI, TemplateListItem } from '../../services/documentAPI';
import { linkAPI } from '../../services/linkAPI';
import toast from 'react-hot-toast';

interface SignLinkFormData {
  template_token: string;
  usage: 'single' | 'multi';
  signee_name?: string;
  email?: string;
  mobile?: string;
  title: string;
  message?: string;
  validFrom?: string;
  validTill?: string;
}

interface SignLinkFormProps {
  onSuccess?: (link: string, token: string) => void;
  onCancel?: () => void;
}

export const SignLinkForm: React.FC<SignLinkFormProps> = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [generatedToken, setGeneratedToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignLinkFormData>({
    defaultValues: {
      usage: 'single',
      title: '',
    },
  });

  const watchedUsage = watch('usage');

  // Load templates when component mounts
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const response = await documentAPI.getTemplateList();
      if (response.success) {
        setTemplates(response.templates);
      }
    } catch (error) {
      console.error('Failed to load templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const onSubmit = async (data: SignLinkFormData) => {
    try {
      setIsSubmitting(true);

      // Build API payload
      const payload = {
        token: data.template_token,
        isSingleUse: data.usage === 'single' ? 1 : 0,
        title: data.title,
        signee: data.usage === 'single' ? data.signee_name || '' : '',
        email: data.usage === 'single' ? data.email || '' : '',
        mobile: data.usage === 'single' ? data.mobile || '' : '',
        message: data.message || '',
        validFrom: data.validFrom || new Date().toISOString(),
        validTill: data.validTill || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      };

      const response = await linkAPI.createLink(payload);
      
      if (response.success) {
        setGeneratedLink(response.link);
        setGeneratedToken(response.token);
        toast.success('Signing link created successfully!');
        onSuccess?.(response.link, response.token);
      } else {
        toast.error('Failed to create signing link');
      }
    } catch (error: any) {
      console.error('Error creating signing link:', error);
      toast.error(error.response?.data?.message || 'Failed to create signing link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    reset();
    setGeneratedLink('');
    setGeneratedToken('');
  };

  // If link is generated, show success state
  if (generatedLink) {
    return (
      <div className="w-full max-w-none bg-white">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Signing Link Created!</h2>
            <p className="text-sm sm:text-base text-gray-600">Your signing link is ready to be shared.</p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Generated Link */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signing Link
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-mono"
                />
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedLink)}
                    className="flex-1 sm:flex-none"
                  >
                    <Copy size={16} />
                    <span className="ml-1 sm:hidden">Copy</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => openLink(generatedLink)}
                    className="flex-1 sm:flex-none"
                  >
                    <ExternalLink size={16} />
                    <span className="ml-1 sm:hidden">Open</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Token */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <label className="block text-sm font-medium text-blue-900 mb-1">
                Link Token
              </label>
              <p className="text-xs sm:text-sm text-blue-700 font-mono break-all">{generatedToken}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
                className="w-full sm:w-auto"
              >
                Create Another Link
              </Button>
              {onCancel && (
                <Button 
                  type="button" 
                  onClick={onCancel}
                  className="w-full sm:w-auto"
                >
                  Done
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none bg-white">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Signing Link</h2>
          <p className="text-sm sm:text-base text-gray-600">Generate a secure link for document signing.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Template Selection */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Template Selection
            </h3>
            
            {isLoadingTemplates ? (
              <div className="text-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-sm sm:text-base text-gray-600 mt-2">Loading templates...</p>
              </div>
            ) : (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Select Template
                </label>
                <select
                  {...register('template_token', {
                    required: 'Please select a template',
                  })}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Choose a template...</option>
                  {templates.map((template) => (
                    <option key={template.token} value={template.token}>
                      {template.document_title}
                    </option>
                  ))}
                </select>
                {errors.template_token && (
                  <p className="text-sm text-red-600">{errors.template_token.message}</p>
                )}
                
                {templates.length === 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    No templates available. Create a template first to generate signing links.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Usage Type */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Link Usage
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                {
                  value: 'single',
                  label: 'Single Use',
                  icon: User,
                  description: 'Link can only be used once by a specific person',
                },
                {
                  value: 'multi',
                  label: 'Multi Use',
                  icon: Users,
                  description: 'Link can be used multiple times by different people',
                },
              ].map((option) => {
                const Icon = option.icon;
                const isSelected = watchedUsage === option.value;
                
                return (
                  <motion.label
                    key={option.value}
                    className={`relative flex items-start sm:items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      {...register('usage')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <Icon 
                      size={20} 
                      className={`mr-3 flex-shrink-0 mt-0.5 sm:mt-0 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} 
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-medium text-sm sm:text-base ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.label}
                      </h4>
                      <p className={`text-xs sm:text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        {option.description}
                      </p>
                    </div>
                  </motion.label>
                );
              })}
            </div>
          </div>

          {/* Single Use Details */}
          {watchedUsage === 'single' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 sm:space-y-6"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Signee Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Input
                  {...register('signee_name', {
                    required: watchedUsage === 'single' ? 'Signee name is required' : false,
                  })}
                  label="Signee Name"
                  placeholder="John Doe"
                  error={errors.signee_name?.message}
                  icon={User}
                  className="text-sm sm:text-base"
                />

                <Input
                  {...register('email', {
                    required: watchedUsage === 'single' ? 'Email is required' : false,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  label="Email Address"
                  placeholder="john@example.com"
                  error={errors.email?.message}
                  icon={Mail}
                  className="text-sm sm:text-base"
                />

                <div className="sm:col-span-2">
                  <Input
                    {...register('mobile')}
                    type="tel"
                    label="Mobile (Optional)"
                    placeholder="+49 151 701 33 555"
                    icon={Phone}
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Email Configuration */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Email Configuration
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <Input
                {...register('title', {
                  required: 'Email subject is required',
                })}
                label="Email Subject"
                placeholder="Please sign this document"
                error={errors.title?.message}
                className="text-sm sm:text-base"
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Add a custom message for the signee..."
                />
              </div>
            </div>
          </div>

          {/* Validity Period */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Validity Period (Optional)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Valid From
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('validFrom')}
                    type="datetime-local"
                    className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Valid Till
                </label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register('validTill')}
                    type="datetime-local"
                    className="w-full pl-10 pr-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-600">
              If not specified, the link will be valid from now for 30 days.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={templates.length === 0}
              className="w-full sm:w-auto min-w-[120px] order-1 sm:order-2"
            >
              Create Signing Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
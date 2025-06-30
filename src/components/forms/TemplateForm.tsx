import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload, FileText, List, Layers, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { documentAPI, ChecklistListItem } from '../../services/documentAPI';
import toast from 'react-hot-toast';

interface TemplateFormData {
  document_title: string;
  comments: string;
  mode: 'document' | 'checklist' | 'both';
  file?: FileList;
  checklist_id?: string;
}

interface TemplateFormProps {
  onSuccess?: (token: string) => void;
  onCancel?: () => void;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedAttachmentId, setUploadedAttachmentId] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [checklists, setChecklists] = useState<ChecklistListItem[]>([]);
  const [isLoadingChecklists, setIsLoadingChecklists] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<TemplateFormData>({
    defaultValues: {
      document_title: '',
      comments: '',
      mode: 'document',
    },
  });

  const watchedMode = watch('mode');
  const watchedFile = watch('file');

  // Load checklists when component mounts or mode changes to include checklist
  useEffect(() => {
    if (watchedMode === 'checklist' || watchedMode === 'both') {
      loadChecklists();
    }
  }, [watchedMode]);

  const loadChecklists = async () => {
    try {
      setIsLoadingChecklists(true);
      const response = await documentAPI.getChecklistList();
      if (response.success) {
        setChecklists(response.checklist);
      }
    } catch (error) {
      console.error('Failed to load checklists:', error);
      toast.error('Failed to load checklists');
    } finally {
      setIsLoadingChecklists(false);
    }
  };

  // Handle file upload when file is selected
  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      handleFileUpload(watchedFile[0]);
    }
  }, [watchedFile]);

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadedFileName(file.name);
      const response = await documentAPI.uploadAttachment(file);
      if (response.success) {
        setUploadedAttachmentId(response.token);
        toast.success('File uploaded successfully');
      } else {
        toast.error('Failed to upload file');
        setUploadedFileName('');
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error(error.response?.data?.message || 'Failed to upload file');
      setUploadedFileName('');
    } finally {
      setIsUploading(false);
    }
  };

  const clearUploadedFile = () => {
    setUploadedAttachmentId('');
    setUploadedFileName('');
    setValue('file', undefined);
  };

  const onSubmit = async (data: TemplateFormData) => {
    try {
      setIsSubmitting(true);

      // Validate based on mode
      if ((data.mode === 'document' || data.mode === 'both') && !uploadedAttachmentId) {
        toast.error('Please upload a document file');
        return;
      }

      if ((data.mode === 'checklist' || data.mode === 'both') && !data.checklist_id) {
        toast.error('Please select a checklist');
        return;
      }

      // Determine document_type based on mode
      let document_type: 1 | 2 | 3;
      switch (data.mode) {
        case 'document':
          document_type = 1; // Only Document (PDF)
          break;
        case 'checklist':
          document_type = 2; // Only Checklist
          break;
        case 'both':
          document_type = 3; // Document with Checklist
          break;
        default:
          document_type = 1;
      }

      // Build API payload
      const apiData = {
        title_image: '', // Not used in this form
        document_title: data.document_title,
        Comments: data.comments,
        attachement_id: uploadedAttachmentId || undefined,
        checklist_id: data.checklist_id || undefined,
        document_type,
        user_id: 0, // 0 means applicable for all users
      };

      const response = await documentAPI.createTemplate(apiData);
      
      if (response.success) {
        toast.success(`Template created: ${response.token}`);
        reset();
        setUploadedAttachmentId('');
        setUploadedFileName('');
        onSuccess?.(response.token);
      } else {
        toast.error('Failed to create template');
      }
    } catch (error: any) {
      console.error('Error creating template:', error);
      toast.error(error.response?.data?.message || 'Failed to create template');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modeOptions = [
    { value: 'document', label: 'Document Only', icon: FileText, description: 'PDF document for signing' },
    { value: 'checklist', label: 'Checklist Only', icon: List, description: 'Interactive form fields' },
    { value: 'both', label: 'Document + Checklist', icon: Layers, description: 'PDF with form fields' },
  ];

  return (
    <div className="w-full max-w-none bg-white">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Template</h2>
          <p className="text-sm sm:text-base text-gray-600">Create a reusable template for document signing workflows.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Basic Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <Input
                {...register('document_title', {
                  required: 'Template title is required',
                  maxLength: { value: 200, message: 'Title must be 200 characters or less' },
                })}
                label="Template Title"
                placeholder="Enter template title"
                error={errors.document_title?.message}
                className="text-sm sm:text-base"
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Comments (Optional)
                </label>
                <textarea
                  {...register('comments')}
                  rows={3}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Add any comments or notes about this template"
                />
              </div>
            </div>
          </div>

          {/* Template Mode */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Template Type
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {modeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = watchedMode === option.value;
                
                return (
                  <motion.label
                    key={option.value}
                    className={`relative flex flex-col items-center p-4 sm:p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <input
                      {...register('mode')}
                      type="radio"
                      value={option.value}
                      className="sr-only"
                    />
                    <Icon 
                      size={24} 
                      className={`mb-2 sm:mb-3 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} 
                    />
                    <h4 className={`font-medium mb-1 text-sm sm:text-base text-center ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {option.label}
                    </h4>
                    <p className={`text-xs sm:text-sm text-center ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                      {option.description}
                    </p>
                  </motion.label>
                );
              })}
            </div>
          </div>

          {/* Document Upload */}
          {(watchedMode === 'document' || watchedMode === 'both') && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Document Upload
              </h3>
              
              {!uploadedAttachmentId ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8">
                  <div className="text-center">
                    <Upload size={32} className="text-gray-400 mx-auto mb-4" />
                    <h4 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Upload Document</h4>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">
                      Select a PDF file to use as the base document for signing.
                    </p>
                    
                    <div className="flex items-center justify-center">
                      <label className="relative cursor-pointer">
                        <input
                          {...register('file', {
                            required: watchedMode === 'document' || watchedMode === 'both' 
                              ? 'Document file is required' : false,
                          })}
                          type="file"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                          className="sr-only"
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isUploading}
                          loading={isUploading}
                          className="pointer-events-none w-full sm:w-auto"
                        >
                          {isUploading ? 'Uploading...' : 'Choose File'}
                        </Button>
                      </label>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, DOC, DOCX, PNG, JPG, JPEG
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle size={24} className="text-green-600 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-green-900 text-sm sm:text-base">File uploaded successfully</p>
                        <p className="text-sm text-green-700 truncate">{uploadedFileName}</p>
                        <p className="text-xs text-green-600">ID: {uploadedAttachmentId}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={clearUploadedFile}
                      className="text-red-600 hover:text-red-800 w-full sm:w-auto"
                    >
                      <Trash2 size={16} />
                      <span className="ml-1">Remove</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {errors.file && (
                <p className="text-sm text-red-600">{errors.file.message}</p>
              )}
            </div>
          )}

          {/* Checklist Selection */}
          {(watchedMode === 'checklist' || watchedMode === 'both') && (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Checklist Selection
              </h3>
              
              {isLoadingChecklists ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm sm:text-base text-gray-600 mt-2">Loading checklists...</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Select Checklist
                  </label>
                  <select
                    {...register('checklist_id', {
                      required: watchedMode === 'checklist' || watchedMode === 'both' 
                        ? 'Please select a checklist' : false,
                    })}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a checklist...</option>
                    {checklists.map((checklist) => (
                      <option key={checklist.token} value={checklist.token}>
                        {checklist.title}
                      </option>
                    ))}
                  </select>
                  {errors.checklist_id && (
                    <p className="text-sm text-red-600">{errors.checklist_id.message}</p>
                  )}
                  
                  {checklists.length === 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      No checklists available. Create a checklist first to use this option.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

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
              disabled={isUploading}
              className="w-full sm:w-auto min-w-[120px] order-1 sm:order-2"
            >
              Create Template
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
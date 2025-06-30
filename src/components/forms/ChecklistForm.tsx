import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, EyeOff, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { documentAPI } from '../../services/documentAPI';
import toast from 'react-hot-toast';

interface ChecklistOption {
  label: string;
  value: string;
}

interface VisibilityCondition {
  field_name: string;
  operator: 'equals' | 'contains';
  value: string;
}

interface ChecklistItemForm {
  type: 'radio' | 'checkbox' | 'text' | 'textarea' | 'select' | 'multi-select';
  name: string;
  text: string;
  required: boolean;
  order: number;
  options: ChecklistOption[];
  visibility_condition?: VisibilityCondition;
  enableVisibility: boolean;
}

interface ChecklistFormData {
  title: string;
  description: string;
  items: ChecklistItemForm[];
}

interface ChecklistFormProps {
  onSuccess?: (token: string) => void;
  onCancel?: () => void;
}

export const ChecklistForm: React.FC<ChecklistFormProps> = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<ChecklistFormData>({
    defaultValues: {
      title: '',
      description: '',
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items');

  const typeOptions = [
    { value: 'radio', label: 'Radio Button' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'text', label: 'Text Input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select Dropdown' },
    { value: 'multi-select', label: 'Multi-Select' },
  ];

  const operatorOptions = [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' },
  ];

  const typesWithOptions = ['select', 'multi-select', 'radio', 'checkbox'];

  const toggleItemExpansion = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const addItem = () => {
    const newOrder = fields.length > 0 ? Math.max(...fields.map((_, index) => watchedItems[index]?.order || 0)) + 1 : 1;
    const newIndex = fields.length;
    append({
      type: 'text',
      name: '',
      text: '',
      required: false,
      order: newOrder,
      options: [],
      enableVisibility: false,
    });
    // Auto-expand new item on mobile
    if (window.innerWidth < 768) {
      setExpandedItems(prev => new Set([...prev, newIndex]));
    }
  };

  const addOption = (itemIndex: number) => {
    const currentOptions = watchedItems[itemIndex]?.options || [];
    setValue(`items.${itemIndex}.options`, [
      ...currentOptions,
      { label: '', value: '' },
    ]);
  };

  const removeOption = (itemIndex: number, optionIndex: number) => {
    const currentOptions = watchedItems[itemIndex]?.options || [];
    const newOptions = currentOptions.filter((_, index) => index !== optionIndex);
    setValue(`items.${itemIndex}.options`, newOptions);
  };

  const onSubmit = async (data: ChecklistFormData) => {
    try {
      setIsSubmitting(true);

      // Validate items
      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        
        // Check required fields
        if (!item.name || !item.text) {
          toast.error(`Item ${i + 1}: Name and prompt are required`);
          return;
        }

        // Check options for types that require them
        if (typesWithOptions.includes(item.type)) {
          if (!item.options || item.options.length < 2) {
            toast.error(`Item ${i + 1}: At least 2 options are required for ${item.type}`);
            return;
          }
          
          // Check that all options have label and value
          for (let j = 0; j < item.options.length; j++) {
            if (!item.options[j].label || !item.options[j].value) {
              toast.error(`Item ${i + 1}, Option ${j + 1}: Both label and value are required`);
              return;
            }
          }
        }
      }

      // Transform data for API
      const apiData = {
        title: data.title,
        description: data.description,
        items: data.items.map(item => ({
          type: item.type,
          text: item.text,
          name: item.name,
          required: item.required,
          order: item.order,
          ...(typesWithOptions.includes(item.type) && { options: item.options }),
          ...(item.enableVisibility && item.visibility_condition && {
            visibility_condition: item.visibility_condition,
          }),
        })),
      };

      const response = await documentAPI.createChecklist(apiData);
      
      if (response.success) {
        toast.success('Checklist created successfully!');
        reset();
        onSuccess?.(response.token);
      } else {
        toast.error('Failed to create checklist');
      }
    } catch (error: any) {
      console.error('Error creating checklist:', error);
      toast.error(error.response?.data?.message || 'Failed to create checklist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-none bg-white">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Checklist</h2>
          <p className="text-sm sm:text-base text-gray-600">Build a reusable checklist template for document workflows.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Basic Information */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <Input
                {...register('title', {
                  required: 'Title is required',
                  maxLength: { value: 100, message: 'Title must be 100 characters or less' },
                })}
                label="Title"
                placeholder="Enter checklist title"
                error={errors.title?.message}
                className="text-sm sm:text-base"
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    maxLength: { value: 500, message: 'Description must be 500 characters or less' },
                  })}
                  rows={3}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter checklist description"
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 flex-1">
                Checklist Items
              </h3>
              <Button 
                type="button" 
                onClick={addItem} 
                variant="outline" 
                size="sm"
                className="w-full sm:w-auto"
              >
                <Plus size={16} />
                <span className="ml-1">Add Item</span>
              </Button>
            </div>

            <AnimatePresence>
              {fields.map((field, index) => {
                const itemType = watchedItems[index]?.type;
                const showOptions = itemType && typesWithOptions.includes(itemType);
                const enableVisibility = watchedItems[index]?.enableVisibility;
                const isExpanded = expandedItems.has(index);
                const isMobile = window.innerWidth < 768;

                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Item Header - Always Visible */}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm sm:text-base font-medium text-gray-900">
                            Item {index + 1}
                          </h4>
                          {isMobile && (
                            <button
                              type="button"
                              onClick={() => toggleItemExpansion(index)}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          )}
                        </div>
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      {/* Mobile: Collapsed View */}
                      {isMobile && !isExpanded && (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 truncate">
                            {watchedItems[index]?.text || 'No prompt set'}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              {typeOptions.find(opt => opt.value === itemType)?.label || 'Text'}
                            </span>
                            {watchedItems[index]?.required && (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                Required
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Desktop: Always Expanded, Mobile: Conditionally Expanded */}
                      {(!isMobile || isExpanded) && (
                        <div className="space-y-4">
                          {/* Basic Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {/* Type */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">Type</label>
                              <select
                                {...register(`items.${index}.type` as const)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              >
                                {typeOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Name */}
                            <Input
                              {...register(`items.${index}.name` as const, {
                                required: 'Name is required',
                              })}
                              label="Field Name"
                              placeholder="field_name"
                              error={errors.items?.[index]?.name?.message}
                              className="text-sm"
                            />

                            {/* Order */}
                            <Input
                              {...register(`items.${index}.order` as const, {
                                required: 'Order is required',
                                valueAsNumber: true,
                                min: { value: 1, message: 'Order must be at least 1' },
                              })}
                              type="number"
                              label="Order"
                              placeholder="1"
                              error={errors.items?.[index]?.order?.message}
                              className="text-sm"
                            />

                            {/* Required */}
                            <div className="space-y-1">
                              <label className="block text-sm font-medium text-gray-700">Required</label>
                              <div className="flex items-center h-10">
                                <input
                                  {...register(`items.${index}.required` as const)}
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Required field</span>
                              </div>
                            </div>
                          </div>

                          {/* Prompt */}
                          <Input
                            {...register(`items.${index}.text` as const, {
                              required: 'Prompt is required',
                            })}
                            label="Prompt (Label shown to user)"
                            placeholder="Enter the question or prompt for this field"
                            error={errors.items?.[index]?.text?.message}
                            className="text-sm"
                          />

                          {/* Options */}
                          {showOptions && (
                            <div>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <label className="block text-sm font-medium text-gray-700">Options</label>
                                <Button
                                  type="button"
                                  onClick={() => addOption(index)}
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto"
                                >
                                  <Plus size={14} />
                                  <span className="ml-1">Add Option</span>
                                </Button>
                              </div>
                              
                              <div className="space-y-2">
                                {watchedItems[index]?.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                    <Input
                                      {...register(`items.${index}.options.${optionIndex}.label` as const, {
                                        required: 'Option label is required',
                                      })}
                                      placeholder="Option label"
                                      className="flex-1 text-sm"
                                    />
                                    <Input
                                      {...register(`items.${index}.options.${optionIndex}.value` as const, {
                                        required: 'Option value is required',
                                      })}
                                      placeholder="Option value"
                                      className="flex-1 text-sm"
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => removeOption(index, optionIndex)}
                                      variant="ghost"
                                      size="sm"
                                      className="text-red-600 hover:text-red-800 w-full sm:w-auto"
                                    >
                                      <Trash2 size={14} />
                                      <span className="ml-1 sm:hidden">Remove</span>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Visibility Condition */}
                          <div className="border-t border-gray-200 pt-4">
                            <div className="flex items-center space-x-2 mb-3">
                              <input
                                {...register(`items.${index}.enableVisibility` as const)}
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label className="text-sm font-medium text-gray-700">
                                Enable Visibility Rule
                              </label>
                              {enableVisibility ? (
                                <Eye size={16} className="text-blue-600" />
                              ) : (
                                <EyeOff size={16} className="text-gray-400" />
                              )}
                            </div>

                            {enableVisibility && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                              >
                                <Input
                                  {...register(`items.${index}.visibility_condition.field_name` as const)}
                                  label="Field Name"
                                  placeholder="other_field_name"
                                  className="text-sm"
                                />
                                
                                <div className="space-y-1">
                                  <label className="block text-sm font-medium text-gray-700">Operator</label>
                                  <select
                                    {...register(`items.${index}.visibility_condition.operator` as const)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    {operatorOptions.map(option => (
                                      <option key={option.value} value={option.value}>
                                        {option.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <Input
                                  {...register(`items.${index}.visibility_condition.value` as const)}
                                  label="Value"
                                  placeholder="expected_value"
                                  className="text-sm"
                                />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {fields.length === 0 && (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <Settings size={32} sm:size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No items added yet</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Start building your checklist by adding items.</p>
                <Button 
                  type="button" 
                  onClick={addItem} 
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <Plus size={16} />
                  <span className="ml-1">Add First Item</span>
                </Button>
              </div>
            )}
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
              disabled={fields.length === 0}
              className="w-full sm:w-auto min-w-[120px] order-1 sm:order-2"
            >
              Create Checklist
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
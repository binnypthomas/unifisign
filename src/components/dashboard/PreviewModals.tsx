import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  FileText, 
  List, 
  Link as LinkIcon, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  Download, 
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Eye,
  Tag,
  Paperclip,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  EyeOff,
  Copy
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ChecklistViewResponse, TemplateViewResponse } from '../../services/documentAPI';
import { LinkViewResponse } from '../../services/linkAPI';
import toast from 'react-hot-toast';

interface ChecklistPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  checklist: ChecklistViewResponse | null;
  isLoading: boolean;
}

export const ChecklistPreviewModal: React.FC<ChecklistPreviewModalProps> = ({
  isOpen,
  onClose,
  checklist,
  isLoading
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  const toggleGroup = (itemId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedGroups(newExpanded);
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
        return <Users size={16} className="text-slate-600" />;
      default:
        return <Settings size={16} className="text-gray-600" />;
    }
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'textarea':
        return 'bg-green-100 text-green-800';
      case 'checkbox':
      case 'multi-select':
        return 'bg-purple-100 text-purple-800';
      case 'radio':
      case 'select':
        return 'bg-orange-100 text-orange-800';
      case 'date_time':
        return 'bg-teal-100 text-teal-800';
      case 'group':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderChecklistItem = (item: any, index: number, depth: number = 0) => {
    const isGroup = item.type === 'group';
    const isExpanded = expandedGroups.has(item.id || index);
    const hasVisibilityCondition = item.visibility_condition;

    return (
      <motion.div
        key={item.id || `item-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`border border-gray-200 rounded-lg hover:shadow-sm transition-shadow ${
          depth > 0 ? 'ml-6 border-l-4 border-l-blue-200' : ''
        }`}
        style={{ marginLeft: depth > 0 ? `${depth * 24}px` : '0' }}
      >
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                {isGroup && (
                  <button
                    onClick={() => toggleGroup(item.id || index)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown size={16} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={16} className="text-gray-500" />
                    )}
                  </button>
                )}
                {getFieldTypeIcon(item.type)}
                <span className="font-medium text-gray-900">{item.text}</span>
                {(item.required === 1 || item.required === true) && (
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    Required
                  </span>
                )}
                {hasVisibilityCondition && (
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full flex items-center space-x-1">
                    <EyeOff size={12} />
                    <span>Conditional</span>
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className={`px-2 py-1 text-xs rounded-full ${getFieldTypeColor(item.type)}`}>
                  {item.type}
                </span>
                {item.name && (
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.name}
                  </span>
                )}
                <span className="text-gray-400">Order: {item.order}</span>
                {isGroup && item.items && (
                  <span className="text-gray-400">{item.items.length} sub-items</span>
                )}
              </div>

              {/* Options */}
              {item.options && item.options.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.options.map((option: any, optIndex: number) => (
                      <div key={optIndex} className="text-sm bg-gray-50 px-3 py-2 rounded">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-gray-500 ml-2">({option.value})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visibility Condition */}
              {hasVisibilityCondition && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900 mb-1 flex items-center space-x-2">
                    <EyeOff size={14} />
                    <span>Visibility Rule:</span>
                  </p>
                  <p className="text-sm text-blue-700">
                    Show when <code className="bg-blue-100 px-1 rounded">{item.visibility_condition.field_name}</code>
                    {' '}{item.visibility_condition.operator}{' '}
                    <code className="bg-blue-100 px-1 rounded">{item.visibility_condition.value}</code>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Group Sub-items */}
        {isGroup && item.items && isExpanded && (
          <div className="border-t border-gray-200 bg-gray-50">
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Group Items:</p>
              <div className="space-y-3">
                {item.items
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((subItem: any, subIndex: number) => 
                    renderChecklistItem(subItem, subIndex, depth + 1)
                  )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Loading Checklist..." size="lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  if (!checklist) return null;

  // Handle both API response structures
  const checklistData = checklist.checklist || checklist;
  const items = checklistData.items || [];

  // Count total items including sub-items
  const getTotalItemCount = (items: any[]): number => {
    return items.reduce((count, item) => {
      let itemCount = 1;
      if (item.type === 'group' && item.items) {
        itemCount += getTotalItemCount(item.items);
      }
      return count + itemCount;
    }, 0);
  };

  const totalItems = getTotalItemCount(items);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Checklist Preview" size="lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <List size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{checklistData.title}</h3>
              <p className="text-sm text-gray-500">
                Token: {checklistData.token || checklist.token || 'N/A'}
              </p>
            </div>
          </div>
          
          {checklistData.description && (
            <div className="bg-blue-50 p-3 rounded-lg mb-3">
              <p className="text-blue-900 text-sm">{checklistData.description}</p>
            </div>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {checklistData.created_at && (
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Created: {new Date(checklistData.created_at).toLocaleDateString()}</span>
              </span>
            )}
            {checklistData.updated_at && (
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>Updated: {new Date(checklistData.updated_at).toLocaleDateString()}</span>
              </span>
            )}
            <span className="flex items-center space-x-1">
              <Tag size={14} />
              <span>{items.length} main items</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users size={14} />
              <span>{totalItems} total items</span>
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Checklist Items</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // Expand all groups
                const allGroupIds = new Set<number>();
                const findGroups = (items: any[]) => {
                  items.forEach((item, index) => {
                    if (item.type === 'group') {
                      allGroupIds.add(item.id || index);
                      if (item.items) {
                        findGroups(item.items);
                      }
                    }
                  });
                };
                findGroups(items);
                setExpandedGroups(expandedGroups.size === allGroupIds.size ? new Set() : allGroupIds);
              }}
            >
              {expandedGroups.size > 0 ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <List size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No items in this checklist</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items
                .sort((a: any, b: any) => a.order - b.order)
                .map((item: any, index: number) => renderChecklistItem(item, index))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateViewResponse | null;
  isLoading: boolean;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  template,
  isLoading
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  const toggleGroup = (itemId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedGroups(newExpanded);
  };

  const getDocumentTypeLabel = (type: number) => {
    switch (type) {
      case 1: return 'Document Only (PDF)';
      case 2: return 'Checklist Only';
      case 3: return 'Document + Checklist';
      default: return 'Unknown';
    }
  };

  const getDocumentTypeColor = (type: number) => {
    switch (type) {
      case 1: return 'bg-orange-100 text-orange-800';
      case 2: return 'bg-green-100 text-green-800';
      case 3: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return <FileText size={14} className="text-blue-600" />;
      case 'textarea':
        return <FileText size={14} className="text-green-600" />;
      case 'checkbox':
      case 'multi-select':
        return <CheckCircle size={14} className="text-purple-600" />;
      case 'radio':
      case 'select':
        return <List size={14} className="text-orange-600" />;
      case 'date_time':
        return <Calendar size={14} className="text-teal-600" />;
      case 'group':
        return <Users size={14} className="text-slate-600" />;
      default:
        return <Settings size={14} className="text-gray-600" />;
    }
  };

  const getFieldTypeColor = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return 'bg-blue-100 text-blue-800';
      case 'textarea':
        return 'bg-green-100 text-green-800';
      case 'checkbox':
      case 'multi-select':
        return 'bg-purple-100 text-purple-800';
      case 'radio':
      case 'select':
        return 'bg-orange-100 text-orange-800';
      case 'date_time':
        return 'bg-teal-100 text-teal-800';
      case 'group':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderChecklistItem = (item: any, index: number, depth: number = 0) => {
    const isGroup = item.type === 'group';
    const isExpanded = expandedGroups.has(item.id || index);
    const hasVisibilityCondition = item.visibility_condition;

    return (
      <div
        key={item.id || `item-${index}`}
        className={`p-2 bg-gray-50 rounded text-sm ${
          depth > 0 ? 'ml-4 border-l-2 border-blue-200' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {isGroup && (
              <button
                onClick={() => toggleGroup(item.id || index)}
                className="p-0.5 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown size={12} className="text-gray-500" />
                ) : (
                  <ChevronRight size={12} className="text-gray-500" />
                )}
              </button>
            )}
            {getFieldTypeIcon(item.type)}
            <span className="font-medium text-gray-900 flex-1">{item.text}</span>
            {(item.required === 1 || item.required === true) && (
              <span className="px-1.5 py-0.5 text-xs bg-red-100 text-red-800 rounded">
                Required
              </span>
            )}
            {hasVisibilityCondition && (
              <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">
                Conditional
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className={`px-2 py-1 rounded ${getFieldTypeColor(item.type)}`}>
              {item.type}
            </span>
            <span>#{item.order}</span>
          </div>
        </div>

        {/* Group Sub-items */}
        {isGroup && item.items && isExpanded && (
          <div className="mt-2 space-y-1">
            {item.items
              .sort((a: any, b: any) => a.order - b.order)
              .map((subItem: any, subIndex: number) => 
                renderChecklistItem(subItem, subIndex, depth + 1)
              )}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Loading Template..." size="lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  if (!template) return null;

  // Handle both API response structures - the API returns { success: true, template: { ... } }
  const templateData = template.template || template;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Template Preview" size="lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{templateData.document_title}</h3>
              <p className="text-sm text-gray-500">Token: {templateData.token}</p>
            </div>
          </div>
          
          {templateData.comments && (
            <p className="text-gray-600 mb-3">{templateData.comments}</p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className={`px-2 py-1 text-xs rounded-full ${getDocumentTypeColor(templateData.document_type)}`}>
              {getDocumentTypeLabel(templateData.document_type)}
            </span>
            {templateData.created_at && (
              <span className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Created: {new Date(templateData.created_at).toLocaleDateString()}</span>
              </span>
            )}
            {templateData.updated_at && (
              <span className="flex items-center space-x-1">
                <Clock size={14} />
                <span>Updated: {new Date(templateData.updated_at).toLocaleDateString()}</span>
              </span>
            )}
          </div>
        </div>

        {/* Attachment */}
        {templateData.attachment && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <Paperclip size={16} />
              <span>Attachment</span>
            </h4>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{templateData.attachment.original_name}</p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{templateData.attachment.file_type.toUpperCase()}</span>
                      <span>{formatFileSize(templateData.attachment.file_size)}</span>
                      <span>ID: {templateData.attachment.id}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(templateData.attachment!.url, '_blank')}
                  >
                    <Eye size={16} />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(templateData.attachment!.url, '_blank')}
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Linked Checklist */}
        {templateData.checklist && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <List size={16} />
                <span>Linked Checklist</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const allGroupIds = new Set<number>();
                  const findGroups = (items: any[]) => {
                    items.forEach((item, index) => {
                      if (item.type === 'group') {
                        allGroupIds.add(item.id || index);
                        if (item.items) {
                          findGroups(item.items);
                        }
                      }
                    });
                  };
                  findGroups(templateData.checklist!.items || []);
                  setExpandedGroups(expandedGroups.size === allGroupIds.size ? new Set() : allGroupIds);
                }}
              >
                {expandedGroups.size > 0 ? 'Collapse All' : 'Expand All'}
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <List size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{templateData.checklist.title || 'Untitled Checklist'}</p>
                  <p className="text-sm text-gray-500">Token: {templateData.checklist.token}</p>
                </div>
              </div>
              
              {templateData.checklist.description && (
                <p className="text-gray-600 mb-3">{templateData.checklist.description}</p>
              )}
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Checklist Items ({(templateData.checklist.items || []).length}):
                </p>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {(templateData.checklist.items || [])
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => renderChecklistItem(item, index))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Content Message */}
        {!templateData.attachment && !templateData.checklist && (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle size={48} className="mx-auto mb-3 text-gray-300" />
            <p>This template has no attached documents or checklists</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

interface LinkPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: LinkViewResponse | null;
  isLoading: boolean;
}

export const LinkPreviewModal: React.FC<LinkPreviewModalProps> = ({
  isOpen,
  onClose,
  link,
  isLoading
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());

  const toggleGroup = (itemId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedGroups(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'used':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'email':
        return <FileText size={12} className="text-blue-600" />;
      case 'textarea':
        return <FileText size={12} className="text-green-600" />;
      case 'checkbox':
      case 'multi-select':
        return <CheckCircle size={12} className="text-purple-600" />;
      case 'radio':
      case 'select':
        return <List size={12} className="text-orange-600" />;
      case 'date_time':
        return <Calendar size={12} className="text-teal-600" />;
      case 'group':
        return <Users size={12} className="text-slate-600" />;
      default:
        return <Settings size={12} className="text-gray-600" />;
    }
  };

  const renderChecklistItem = (item: any, index: number, depth: number = 0) => {
    const isGroup = item.type === 'group';
    const isExpanded = expandedGroups.has(item.id || index);

    return (
      <div
        key={item.id || `item-${index}`}
        className={`p-2 bg-gray-50 rounded text-sm ${
          depth > 0 ? 'ml-3 border-l-2 border-blue-200' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            {isGroup && (
              <button
                onClick={() => toggleGroup(item.id || index)}
                className="p-0.5 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown size={10} className="text-gray-500" />
                ) : (
                  <ChevronRight size={10} className="text-gray-500" />
                )}
              </button>
            )}
            {getFieldTypeIcon(item.type)}
            <span className="font-medium text-gray-900 flex-1 text-xs">{item.text}</span>
            {(item.required === 1 || item.required === true) && (
              <span className="px-1 py-0.5 text-xs bg-red-100 text-red-800 rounded">Required</span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span className="bg-gray-200 px-1.5 py-0.5 rounded">{item.type}</span>
          </div>
        </div>

        {/* Group Sub-items */}
        {isGroup && item.items && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.items
              .sort((a: any, b: any) => a.order - b.order)
              .map((subItem: any, subIndex: number) => 
                renderChecklistItem(subItem, subIndex, depth + 1)
              )}
          </div>
        )}
      </div>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Loading Link..." size="lg">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  if (!link) return null;

  // Handle the actual API response structure - the API returns { success: true, link: { ... } }
  const linkData = link.link || link;

  // Generate the signing URL using the token
  const signingUrl = `${window.location.origin}/signlink/${linkData.token}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Link Preview" size="lg">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <LinkIcon size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{linkData.title}</h3>
              <p className="text-sm text-gray-500">Token: {linkData.token}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(linkData.status)}`}>
              {linkData.status}
            </span>
            <span className="flex items-center space-x-1">
              <Users size={14} />
              <span>{linkData.isSingleUse === 1 ? 'Single Use' : 'Multi Use'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>Created: {new Date().toLocaleDateString()}</span>
            </span>
          </div>

          {linkData.message && (
            <div className="bg-blue-50 p-3 rounded-lg mb-3">
              <p className="text-sm text-blue-900">{linkData.message}</p>
            </div>
          )}

          {/* Signing URL */}
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900 mb-1">Signing URL:</p>
                <p className="text-sm text-green-700 font-mono break-all">{signingUrl}</p>
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(signingUrl)}
                >
                  <Copy size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(signingUrl, '_blank')}
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Link Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Link Details</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Validity Period */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Clock size={16} />
                <span>Validity Period</span>
              </h5>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>From:</strong> {new Date(linkData.validFrom).toLocaleString()}</p>
                <p><strong>Till:</strong> {new Date(linkData.validTill).toLocaleString()}</p>
              </div>
            </div>

            {/* Signee Information */}
            {linkData.isSingleUse === 1 && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <User size={16} />
                  <span>Signee Information</span>
                </h5>
                <div className="space-y-2 text-sm text-gray-600">
                  {linkData.signeeName && linkData.signeeName !== "0" && (
                    <p><strong>Name:</strong> {linkData.signeeName}</p>
                  )}
                  {linkData.signeeEmail && (
                    <p className="flex items-center space-x-1">
                      <Mail size={14} />
                      <span>{linkData.signeeEmail}</span>
                    </p>
                  )}
                  {linkData.signeeMobile && (
                    <p className="flex items-center space-x-1">
                      <Phone size={14} />
                      <span>{linkData.signeeMobile}</span>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Associated Template */}
        {linkData.template && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900 flex items-center space-x-2">
              <FileText size={16} />
              <span>Associated Template</span>
            </h4>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{linkData.template.document_title}</p>
                  <p className="text-sm text-gray-500">Token: {linkData.template.token}</p>
                </div>
              </div>
              
              {linkData.template.comments && (
                <p className="text-gray-600 mb-3">{linkData.template.comments}</p>
              )}

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  Type {linkData.template.document_type}
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>Created: {new Date(linkData.template.created_at).toLocaleDateString()}</span>
                </span>
              </div>

              {/* Template Attachment */}
              {linkData.template.attachment && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Paperclip size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {linkData.template.attachment.original_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {linkData.template.attachment.file_type.toUpperCase()} • {formatFileSize(linkData.template.attachment.file_size)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(linkData.template.attachment!.url, '_blank')}
                    >
                      <ExternalLink size={14} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Associated Checklist */}
        {linkData.template && linkData.template.checklist && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                <List size={16} />
                <span>Associated Checklist</span>
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const allGroupIds = new Set<number>();
                  const findGroups = (items: any[]) => {
                    items.forEach((item, index) => {
                      if (item.type === 'group') {
                        allGroupIds.add(item.id || index);
                        if (item.items) {
                          findGroups(item.items);
                        }
                      }
                    });
                  };
                  findGroups(linkData.template.checklist!.items || []);
                  setExpandedGroups(expandedGroups.size === allGroupIds.size ? new Set() : allGroupIds);
                }}
              >
                {expandedGroups.size > 0 ? 'Collapse All' : 'Expand All'}
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <List size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{linkData.template.checklist.title || 'Untitled Checklist'}</p>
                  <p className="text-sm text-gray-500">Token: {linkData.template.checklist.token}</p>
                </div>
              </div>
              
              {linkData.template.checklist.description && (
                <p className="text-gray-600 mb-3">{linkData.template.checklist.description}</p>
              )}
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Checklist Items ({(linkData.template.checklist.items || []).length}):
                </p>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {(linkData.template.checklist.items || [])
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => renderChecklistItem(item, index))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
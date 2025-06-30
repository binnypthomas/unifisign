import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, FileText, Users, Settings, Download, ExternalLink, Copy, List, Link as LinkIcon, Edit, Eye, Calendar, Clock, User, AlertCircle, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ChecklistForm, TemplateForm, SignLinkForm } from '../components/forms';
import { ChecklistPreviewModal, TemplatePreviewModal, LinkPreviewModal } from '../components/dashboard/PreviewModals';
import { userAPI, DashboardData, DashboardDocument } from '../services/userAPI';
import { linkAPI, LinkListItem, LinkViewResponse } from '../services/linkAPI';
import { documentAPI, TemplateListItem, ChecklistListItem, ChecklistViewResponse, TemplateViewResponse } from '../services/documentAPI';
import toast from 'react-hot-toast';

interface UserLimits {
  maxChecklists: number;
  maxTemplates: number;
  maxLinks: number | null; // null means unlimited
  currentChecklists: number;
  currentTemplates: number;
  currentLinks: number;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('documents');
  const [selectedContentTab, setSelectedContentTab] = useState('links');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Content data states
  const [links, setLinks] = useState<LinkListItem[]>([]);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [checklists, setChecklists] = useState<ChecklistListItem[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  
  // Modal states
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isSignLinkModalOpen, setIsSignLinkModalOpen] = useState(false);

  // Preview modal states
  const [isChecklistPreviewOpen, setIsChecklistPreviewOpen] = useState(false);
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [isLinkPreviewOpen, setIsLinkPreviewOpen] = useState(false);
  
  // Preview data states
  const [selectedChecklistPreview, setSelectedChecklistPreview] = useState<ChecklistViewResponse | null>(null);
  const [selectedTemplatePreview, setSelectedTemplatePreview] = useState<TemplateViewResponse | null>(null);
  const [selectedLinkPreview, setSelectedLinkPreview] = useState<LinkViewResponse | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // User limits state
  const [userLimits, setUserLimits] = useState<UserLimits>({
    maxChecklists: 0,
    maxTemplates: 0,
    maxLinks: 0,
    currentChecklists: 0,
    currentTemplates: 0,
    currentLinks: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await userAPI.getDashboard();
        setDashboardData(data);
      } catch (error: any) {
        console.error('Failed to fetch dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  // Load content data when content tab changes
  useEffect(() => {
    if (user && selectedContentTab) {
      loadContentData(selectedContentTab);
    }
  }, [user, selectedContentTab]);

  // Calculate user limits based on role and subscription
  useEffect(() => {
    if (user) {
      calculateUserLimits();
    }
  }, [user, checklists, templates, links]);

  const calculateUserLimits = () => {
    if (!user) return;

    let limits: UserLimits = {
      maxChecklists: 0,
      maxTemplates: 0,
      maxLinks: 0,
      currentChecklists: checklists.length,
      currentTemplates: templates.length,
      currentLinks: links.length,
    };

    // Role 1 (SuperAdmin) - No limits
    if (user.role === 1) {
      limits = {
        ...limits,
        maxChecklists: Infinity,
        maxTemplates: Infinity,
        maxLinks: null, // null means unlimited
      };
    }
    // Role 4 (Guest) with Free subscription
    else if (user.role === 4 && user.subscription?.plan === 'Free') {
      limits = {
        ...limits,
        maxChecklists: 1,
        maxTemplates: 1,
        maxLinks: null, // unlimited links for free users
      };
    }
    // Other roles or paid subscriptions - No limits
    else {
      limits = {
        ...limits,
        maxChecklists: Infinity,
        maxTemplates: Infinity,
        maxLinks: null,
      };
    }

    setUserLimits(limits);
  };

  const loadContentData = async (contentType: string) => {
    try {
      setIsLoadingContent(true);
      
      switch (contentType) {
        case 'links':
          const linksResponse = await linkAPI.getLinkList();
          if (linksResponse.success) {
            setLinks(linksResponse.docsignlink);
          }
          break;
          
        case 'templates':
          const templatesResponse = await documentAPI.getTemplateList();
          if (templatesResponse.success) {
            setTemplates(templatesResponse.templates);
          }
          break;
          
        case 'checklists':
          const checklistsResponse = await documentAPI.getChecklistList();
          if (checklistsResponse.success) {
            setChecklists(checklistsResponse.checklist);
          }
          break;
      }
    } catch (error: any) {
      console.error(`Failed to load ${contentType}:`, error);
      toast.error(`Failed to load ${contentType}`);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const refreshDashboard = async () => {
    try {
      const data = await userAPI.getDashboard();
      setDashboardData(data);
      // Also refresh current content tab
      loadContentData(selectedContentTab);
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
    }
  };

  // Check if user can create new items
  const canCreateChecklist = () => {
    if (!user) return false;
    if (user.role === 1) return true; // SuperAdmin
    if (user.role === 4 && user.subscription?.plan === 'Free') {
      return userLimits.currentChecklists < userLimits.maxChecklists;
    }
    return user.role <= 3; // Admin or User roles
  };

  const canCreateTemplate = () => {
    if (!user) return false;
    if (user.role === 1) return true; // SuperAdmin
    if (user.role === 4 && user.subscription?.plan === 'Free') {
      return userLimits.currentTemplates < userLimits.maxTemplates;
    }
    return user.role <= 3; // Admin or User roles
  };

  const canCreateLink = () => {
    if (!user) return false;
    return user.role <= 4; // All roles can create unlimited links
  };

  // Handle creation attempts with limit checks
  const handleCreateChecklist = () => {
    if (!canCreateChecklist()) {
      if (user?.role === 4 && user.subscription?.plan === 'Free') {
        toast.error(`Free users can create up to ${userLimits.maxChecklists} checklist. Upgrade to Pro for unlimited checklists.`);
      } else {
        toast.error('You do not have permission to create checklists.');
      }
      return;
    }
    setIsChecklistModalOpen(true);
  };

  const handleCreateTemplate = () => {
    if (!canCreateTemplate()) {
      if (user?.role === 4 && user.subscription?.plan === 'Free') {
        toast.error(`Free users can create up to ${userLimits.maxTemplates} template. Upgrade to Pro for unlimited templates.`);
      } else {
        toast.error('You do not have permission to create templates.');
      }
      return;
    }
    setIsTemplateModalOpen(true);
  };

  const handleCreateLink = () => {
    if (!canCreateLink()) {
      toast.error('You do not have permission to create signing links.');
      return;
    }
    setIsSignLinkModalOpen(true);
  };

  // Preview handlers
  const handleViewChecklist = async (token: string) => {
    try {
      setIsLoadingPreview(true);
      setIsChecklistPreviewOpen(true);
      const response = await documentAPI.getChecklistView(token);
      setSelectedChecklistPreview(response);
    } catch (error: any) {
      console.error('Failed to load checklist preview:', error);
      toast.error('Failed to load checklist details');
      setIsChecklistPreviewOpen(false);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleViewTemplate = async (token: string) => {
    try {
      setIsLoadingPreview(true);
      setIsTemplatePreviewOpen(true);
      const response = await documentAPI.getTemplateView(token);
      setSelectedTemplatePreview(response);
    } catch (error: any) {
      console.error('Failed to load template preview:', error);
      toast.error('Failed to load template details');
      setIsTemplatePreviewOpen(false);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleViewLink = async (token: string) => {
    try {
      setIsLoadingPreview(true);
      setIsLinkPreviewOpen(true);
      const response = await linkAPI.getLinkView(token);
      setSelectedLinkPreview(response);
    } catch (error: any) {
      console.error('Failed to load link preview:', error);
      toast.error('Failed to load link details');
      setIsLinkPreviewOpen(false);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = (role: number) => {
    const roleNames = { 1: 'Super Admin', 2: 'Admin', 3: 'User', 4: 'Guest' };
    return roleNames[role as keyof typeof roleNames] || 'Unknown';
  };

  const tabs = [
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'signers', name: 'Signers', icon: Users },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const contentTabs = [
    { id: 'links', name: 'Links', icon: LinkIcon },
    { id: 'templates', name: 'Templates', icon: FileText },
    { id: 'checklists', name: 'Checklists', icon: List },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
      case 'used':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checklist':
        return 'bg-blue-100 text-blue-800';
      case 'webform':
        return 'bg-purple-100 text-purple-800';
      case 'pdf':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const filteredDocuments = dashboardData?.documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.signer.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleChecklistSuccess = (token: string) => {
    setIsChecklistModalOpen(false);
    refreshDashboard();
    toast.success(`Checklist created with token: ${token}`);
  };

  const handleTemplateSuccess = (token: string) => {
    setIsTemplateModalOpen(false);
    refreshDashboard();
    toast.success(`Template created with token: ${token}`);
  };

  const handleSignLinkSuccess = (link: string, token: string) => {
    setIsSignLinkModalOpen(false);
    refreshDashboard();
    toast.success('Signing link created successfully!');
  };

  const handleCopyChecklist = async (token: string) => {
    try {
      const response = await documentAPI.copyChecklist(token);
      if (response.success) {
        toast.success(`Checklist copied with token: ${response.token}`);
        loadContentData('checklists');
      }
    } catch (error: any) {
      console.error('Failed to copy checklist:', error);
      toast.error('Failed to copy checklist');
    }
  };

  // Render limit warning component
  const renderLimitWarning = (type: 'checklist' | 'template', current: number, max: number) => {
    if (max === Infinity) return null;
    
    const remaining = max - current;
    if (remaining <= 0) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Lock size={16} className="text-red-600" />
            <div>
              <p className="text-red-800 text-sm font-medium">
                {type === 'checklist' ? 'Checklist' : 'Template'} Limit Reached
              </p>
              <p className="text-red-700 text-xs">
                You've reached your limit of {max} {type}{max > 1 ? 's' : ''}. 
                <button 
                  onClick={() => window.location.href = '/pricing'}
                  className="underline ml-1 hover:text-red-900"
                >
                  Upgrade to Pro
                </button> for unlimited {type}s.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    if (remaining === 1) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <AlertCircle size={16} className="text-yellow-600" />
            <div>
              <p className="text-yellow-800 text-sm font-medium">
                {remaining} {type === 'checklist' ? 'Checklist' : 'Template'} Remaining
              </p>
              <p className="text-yellow-700 text-xs">
                You can create {remaining} more {type}. 
                <button 
                  onClick={() => window.location.href = '/pricing'}
                  className="underline ml-1 hover:text-yellow-900"
                >
                  Upgrade to Pro
                </button> for unlimited {type}s.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  const renderContentTab = () => {
    if (isLoadingContent) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                    <div className="h-5 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-200 rounded w-64"></div>
                    <div className="h-3 bg-gray-200 rounded w-48"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    switch (selectedContentTab) {
      case 'links':
        return (
          <div className="space-y-4">
            {links.length === 0 ? (
              <div className="text-center py-12">
                <LinkIcon size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No links found</h3>
                <p className="text-gray-600 mb-4">Create your first signing link to get started.</p>
                {canCreateLink() && (
                  <Button
                    onClick={handleCreateLink}
                    size="sm"
                  >
                    <LinkIcon size={16} />
                    Create Sign Link
                  </Button>
                )}
              </div>
            ) : (
              links.map((link, index) => (
                <motion.div
                  key={link.token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{link.title || 'Untitled Link'}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(link.status || 'active')}`}>
                          {link.status || 'active'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="truncate max-w-md">{link.url}</p>
                        {link.created_date && (
                          <p className="flex items-center space-x-1 mt-1">
                            <Calendar size={14} />
                            <span>Created {new Date(link.created_date).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewLink(link.token)}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(link.url)}
                      >
                        <Copy size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(link.url, '_blank')}
                      >
                        <ExternalLink size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-4">
            {renderLimitWarning('template', userLimits.currentTemplates, userLimits.maxTemplates)}
            {templates.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-600 mb-4">Create your first template to get started.</p>
                {canCreateTemplate() && (
                  <Button
                    onClick={handleCreateTemplate}
                    size="sm"
                  >
                    <FileText size={16} />
                    Create Template
                  </Button>
                )}
              </div>
            ) : (
              templates.map((template, index) => (
                <motion.div
                  key={template.token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{template.document_title}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          template
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {template.comments && (
                          <p className="mb-1">{template.comments}</p>
                        )}
                        {template.date_time && (
                          <p className="flex items-center space-x-1">
                            <Calendar size={14} />
                            <span>Created {new Date(template.date_time).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewTemplate(template.token)}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(template.token)}
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        );

      case 'checklists':
        return (
          <div className="space-y-4">
            {renderLimitWarning('checklist', userLimits.currentChecklists, userLimits.maxChecklists)}
            {checklists.length === 0 ? (
              <div className="text-center py-12">
                <List size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No checklists found</h3>
                <p className="text-gray-600 mb-4">Create your first checklist to get started.</p>
                {canCreateChecklist() && (
                  <Button
                    onClick={handleCreateChecklist}
                    size="sm"
                  >
                    <List size={16} />
                    Create Checklist
                  </Button>
                )}
              </div>
            ) : (
              checklists.map((checklist, index) => (
                <motion.div
                  key={checklist.token}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{checklist.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          checklist
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="flex items-center space-x-1">
                          <User size={14} />
                          <span>Token: {checklist.token}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewChecklist(checklist.token)}
                      >
                        <Eye size={16} />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopyChecklist(checklist.token)}
                      >
                        <Copy size={16} />
                        Copy
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user.name} ({getRoleDisplayName(user.role)})
                {user.subscription?.plan && (
                  <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {user.subscription.plan}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Create Buttons with Limit Checks */}
              {canCreateChecklist() && (
                <Button
                  onClick={handleCreateChecklist}
                  variant="outline"
                  size="sm"
                  disabled={!canCreateChecklist()}
                >
                  <List size={16} />
                  Create Checklist
                  {user.role === 4 && user.subscription?.plan === 'Free' && (
                    <span className="ml-1 text-xs">
                      ({userLimits.maxChecklists - userLimits.currentChecklists} left)
                    </span>
                  )}
                </Button>
              )}
              
              {canCreateTemplate() && (
                <Button
                  onClick={handleCreateTemplate}
                  variant="outline"
                  size="sm"
                  disabled={!canCreateTemplate()}
                >
                  <FileText size={16} />
                  Create Template
                  {user.role === 4 && user.subscription?.plan === 'Free' && (
                    <span className="ml-1 text-xs">
                      ({userLimits.maxTemplates - userLimits.currentTemplates} left)
                    </span>
                  )}
                </Button>
              )}
              
              {canCreateLink() && (
                <Button
                  onClick={handleCreateLink}
                  size="sm"
                >
                  <LinkIcon size={16} />
                  Create Sign Link
                </Button>
              )}
              
              <Button variant="outline" size="sm">
                <Download size={16} />
                Export
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <DashboardStats 
            summary={dashboardData?.summary || {} as any} 
            isLoading={isLoading} 
          />
        </div>

        {/* Content Management Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Content Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between px-6 py-4">
                <nav className="flex space-x-8">
                  {contentTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedContentTab(tab.id)}
                        className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          selectedContentTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
                
                {/* Quick Create Button for Current Tab */}
                <div className="flex items-center space-x-2">
                  {selectedContentTab === 'links' && canCreateLink() && (
                    <Button
                      onClick={handleCreateLink}
                      size="sm"
                    >
                      <Plus size={16} />
                      Create Link
                    </Button>
                  )}
                  {selectedContentTab === 'templates' && (
                    <Button
                      onClick={handleCreateTemplate}
                      size="sm"
                      disabled={!canCreateTemplate()}
                    >
                      <Plus size={16} />
                      Create Template
                      {!canCreateTemplate() && <Lock size={14} className="ml-1" />}
                    </Button>
                  )}
                  {selectedContentTab === 'checklists' && (
                    <Button
                      onClick={handleCreateChecklist}
                      size="sm"
                      disabled={!canCreateChecklist()}
                    >
                      <Plus size={16} />
                      Create Checklist
                      {!canCreateChecklist() && <Lock size={14} className="ml-1" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Content Tab Content */}
            <div className="p-6">
              {renderContentTab()}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Documents/Management */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          selectedTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {selectedTab === 'documents' && (
                  <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search documents..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Button variant="outline">
                        <Filter size={16} />
                        Filter
                      </Button>
                    </div>

                    {/* Documents List */}
                    {isLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="space-y-1">
                                  <div className="h-3 bg-gray-200 rounded w-64"></div>
                                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="h-8 bg-gray-200 rounded w-16"></div>
                                <div className="h-8 bg-gray-200 rounded w-8"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredDocuments.map((doc, index) => (
                          <motion.div
                            key={`${doc.title}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(doc.type)}`}>
                                    {doc.type}
                                  </span>
                                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                                    {doc.status}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {doc.signer.name ? (
                                    <p>Signed by {doc.signer.name} ({doc.signer.email})</p>
                                  ) : (
                                    <p>Sent to {doc.signer.email}</p>
                                  )}
                                  <p>
                                    Created {new Date(doc.createdOn).toLocaleDateString()}
                                    {doc.signedOn && ` • Signed ${new Date(doc.signedOn).toLocaleDateString()}`}
                                  </p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-blue-600 font-mono truncate max-w-md">{doc.link}</span>
                                    <button
                                      onClick={() => copyToClipboard(doc.link)}
                                      className="text-gray-400 hover:text-gray-600"
                                      title="Copy link"
                                    >
                                      <Copy size={14} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => window.open(doc.link, '_blank')}
                                >
                                  <ExternalLink size={16} />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download size={16} />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {filteredDocuments.length === 0 && !isLoading && (
                          <div className="text-center py-12">
                            <FileText size={48} className="text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                            <p className="text-gray-600 mb-4">
                              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first document to get started.'}
                            </p>
                            {!searchTerm && (
                              <div className="flex items-center justify-center space-x-3">
                                {canCreateChecklist() && (
                                  <Button
                                    onClick={handleCreateChecklist}
                                    variant="outline"
                                    size="sm"
                                  >
                                    <List size={16} />
                                    Create Checklist
                                  </Button>
                                )}
                                {canCreateTemplate() && (
                                  <Button
                                    onClick={handleCreateTemplate}
                                    variant="outline"
                                    size="sm"
                                  >
                                    <FileText size={16} />
                                    Create Template
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'signers' && (
                  <div className="text-center py-12">
                    <Users size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Signer Management</h3>
                    <p className="text-gray-600">Manage your signers and their access permissions.</p>
                  </div>
                )}

                {selectedTab === 'settings' && (
                  <div className="text-center py-12">
                    <Settings size={48} className="text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Account Settings</h3>
                    <p className="text-gray-600">Configure your account preferences and security settings.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity 
              activities={dashboardData?.activity || []} 
              isLoading={isLoading} 
            />
          </div>
        </div>
      </div>

      {/* Create Modals */}
      <Modal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        title="Create Checklist"
        size="xl"
      >
        <ChecklistForm
          onSuccess={handleChecklistSuccess}
          onCancel={() => setIsChecklistModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Create Template"
        size="xl"
      >
        <TemplateForm
          onSuccess={handleTemplateSuccess}
          onCancel={() => setIsTemplateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isSignLinkModalOpen}
        onClose={() => setIsSignLinkModalOpen(false)}
        title="Create Signing Link"
        size="xl"
      >
        <SignLinkForm
          onSuccess={handleSignLinkSuccess}
          onCancel={() => setIsSignLinkModalOpen(false)}
        />
      </Modal>

      {/* Preview Modals */}
      <ChecklistPreviewModal
        isOpen={isChecklistPreviewOpen}
        onClose={() => {
          setIsChecklistPreviewOpen(false);
          setSelectedChecklistPreview(null);
        }}
        checklist={selectedChecklistPreview}
        isLoading={isLoadingPreview}
      />

      <TemplatePreviewModal
        isOpen={isTemplatePreviewOpen}
        onClose={() => {
          setIsTemplatePreviewOpen(false);
          setSelectedTemplatePreview(null);
        }}
        template={selectedTemplatePreview}
        isLoading={isLoadingPreview}
      />

      <LinkPreviewModal
        isOpen={isLinkPreviewOpen}
        onClose={() => {
          setIsLinkPreviewOpen(false);
          setSelectedLinkPreview(null);
        }}
        link={selectedLinkPreview}
        isLoading={isLoadingPreview}
      />
    </div>
  );
};
import api from './axiosInstance'; // ✅ use shared instance

export interface AuditDetails {
  ipAddress: string;
  browserSignature: string;
  browserName: string;
  isMobile: 0 | 1;
  deviceType: string;
  deviceOs: string;
  signedOn: string;
  signedBy: string;
  document_url: string;
}

export interface ChecklistOption {
  label: string;
  value: string;
}

export interface VisibilityCondition {
  field_name: string;
  operator: string;
  value: string;
}

export interface ChecklistItemInput {
  type: 'radio' | 'date_time' | 'select' | 'group' | 'text' | 'textarea' | 'checkbox' | 'multi-select' | 'email';
  text: string;
  name?: string;
  options?: ChecklistOption[];
  required: boolean;
  order: number;
  items?: ChecklistItemInput[];
  visibility_condition?: VisibilityCondition;
}

export interface CreateChecklistRequest {
  title: string;
  description: string;
  items: ChecklistItemInput[];
}

export interface ChecklistResponse {
  success: boolean;
  token: string;
}

export interface ChecklistListItem {
  token: string;
  title: string;
}

export interface CreateTemplateRequest {
  title_image?: string;
  document_title: string;
  Comments: string;
  attachement_id?: string;
  checklist_id?: string;
  document_type: 1 | 2 | 3; // 1: Only Document (PDF), 2: Only Checklist, 3: Document with Checklist
  user_id: number; // 0 means applicable for all users
}

export interface TemplateListItem {
  token: string;
  document_title: string;
  comments: string;
  date_time: string;
}

// New interfaces for view/preview functionality
export interface ChecklistViewItem {
  id: number;
  type: 'radio' | 'date_time' | 'select' | 'group' | 'text' | 'textarea' | 'checkbox' | 'multi-select' | 'email';
  text: string;
  name?: string;
  options?: ChecklistOption[];
  required: boolean;
  order: number;
  items?: ChecklistViewItem[];
  visibility_condition?: VisibilityCondition;
}

export interface ChecklistViewResponse {
  success: boolean;
  token: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  items: ChecklistViewItem[];
}

export interface AttachmentDetails {
  id: string;
  filename: string;
  original_name: string;
  file_type: string;
  file_size: number;
  url: string;
  uploaded_at: string;
}

export interface TemplateViewResponse {
  success: boolean;
  token: string;
  document_title: string;
  comments: string;
  document_type: 1 | 2 | 3;
  created_at: string;
  updated_at: string;
  attachment?: AttachmentDetails;
  checklist?: {
    token: string;
    title: string;
    description: string;
    items: ChecklistViewItem[];
  };
}

export const documentAPI = {
  /**
   * Get document audit trail by token
   */
  getAuditTrail: async (token: string): Promise<{ success: boolean; details: AuditDetails }> => {
    const response = await api.get(`/document/audit/token?token=${token}`);
    return response.data;
  },

  /**
   * Upload PDF file or image attachment
   */
  uploadAttachment: async (file: File): Promise<{ success: boolean; token: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/document/attachment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Get list of checklists for specific user
   */
  getChecklistList: async (): Promise<{ success: boolean; checklist: ChecklistListItem[] }> => {
    const response = await api.get('/document/checklist/list');
    return response.data;
  },

  /**
   * Get detailed view of checklist by token
   */
  getChecklistView: async (token: string): Promise<ChecklistViewResponse> => {
    const response = await api.get(`/document/checklist/view?token=${token}`);
    return response.data;
  },

  /**
   * Create reusable checklist
   */
  createChecklist: async (data: CreateChecklistRequest): Promise<ChecklistResponse> => {
    const response = await api.post('/document/checklist/create', data);
    return response.data;
  },

  /**
   * Copy existing checklist
   */
  copyChecklist: async (token: string): Promise<ChecklistResponse> => {
    const response = await api.post('/document/checklist/copy', { token });
    return response.data;
  },

  /**
   * Update existing checklist
   */
  updateChecklist: async (token: string, data: CreateChecklistRequest): Promise<ChecklistResponse> => {
    const response = await api.post('/document/checklist/update', { token, ...data });
    return response.data;
  },

  /**
   * Delete checklist (set status as inactive)
   */
  deleteChecklist: async (token: string): Promise<{ success: boolean }> => {
    const response = await api.post(`/document/checklist/delete/token`, { token });
    return response.data;
  },

  /**
   * Get document template definition by token
   */
  getTemplate: async (token: string): Promise<any> => {
    const response = await api.get(`/document/template/${token}`);
    return response.data;
  },

  /**
   * Get detailed view of template by token
   */
  getTemplateView: async (token: string): Promise<TemplateViewResponse> => {
    const response = await api.get(`/document/template/view?token=${token}`);
    return response.data;
  },

  /**
   * Create document template
   */
  createTemplate: async (data: CreateTemplateRequest): Promise<{ success: boolean; token: string }> => {
    const response = await api.post('/document/template/create', data);
    return response.data;
  },

  /**
   * Delete template (set status as inactive)
   */
  deleteTemplate: async (token: string): Promise<{ success: boolean }> => {
    const response = await api.post(`/document/template/delete/token`, { token });
    return response.data;
  },

  /**
   * List all templates of logged in user
   */
  getTemplateList: async (): Promise<{ success: boolean; templates: TemplateListItem[] }> => {
    const response = await api.get('/document/template/list');
    return response.data;
  },
};
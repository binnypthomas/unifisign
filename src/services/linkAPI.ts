import api from './axiosInstance'; // ✅ use shared instance

export interface CreateLinkRequest {
  token: string; // Encrypted template ID
  isSingleUse: 0 | 1;
  title: string; // Used as email subject
  signee?: string; // Required if isSingleUse = 1
  email?: string; // Used for OTP validation if isSingleUse = 1
  mobile?: string; // Used for OTP validation if isSingleUse = 1
  message?: string; // Custom email body message
  validFrom: string;
  validTill: string;
}

export interface CreateLinkResponse {
  success: boolean;
  token: string; // Encrypted docsignlink ID
  link: string; // Full signing URL
}

export interface LinkListItem {
  token: string;
  url: string;
  title?: string;
  status?: string;
  created_date?: string;
}

export interface LinkStatusDetails {
  ipAddress: string;
  browserSignature: string;
  browserName: string;
  isMobile: 0 | 1;
  deviceType: string;
  deviceOs: string;
  signedOn: string;
  signedBy: string;
  token: string; // Encrypted document ID
  document_url: string;
}

export interface LinkStatusResponse {
  success: boolean;
  status: 'signed' | 'unsigned';
  details?: LinkStatusDetails;
}

// New interfaces for link view functionality
export interface LinkViewTemplate {
  token: string;
  document_title: string;
  comments: string;
  document_type: 1 | 2 | 3;
  attachment?: {
    id: string;
    filename: string;
    original_name: string;
    file_type: string;
    file_size: number;
    url: string;
  };
}

export interface LinkViewChecklist {
  token: string;
  title: string;
  description: string;
  items: Array<{
    id: number;
    type: string;
    text: string;
    name?: string;
    options?: Array<{ label: string; value: string }>;
    required: boolean;
    order: number;
    visibility_condition?: {
      field_name: string;
      operator: string;
      value: string;
    };
  }>;
}

export interface LinkViewResponse {
  success: boolean;
  token: string;
  title: string;
  message?: string;
  is_single_use: boolean;
  signee?: string;
  email?: string;
  mobile?: string;
  valid_from: string;
  valid_till: string;
  status: string;
  created_at: string;
  template: LinkViewTemplate;
  checklist?: LinkViewChecklist;
}

export const linkAPI = {
  /**
   * Create new tokenized signing link
   * For users with role 3 to send to their customers
   */
  createLink: async (data: CreateLinkRequest): Promise<CreateLinkResponse> => {
    const response = await api.post('/link/create', data);
    return response.data;
  },

  /**
   * List created links for logged in user
   */
  getLinkList: async (): Promise<{ success: boolean; docsignlink: LinkListItem[] }> => {
    const response = await api.get('/link/list');
    return response.data;
  },

  /**
   * Get link status (signed/pending) by token
   */
  getLinkStatus: async (token: string): Promise<LinkStatusResponse> => {
    const response = await api.get(`/link/status/${token}`);
    return response.data;
  },

  /**
   * Get detailed view of link by token
   */
  getLinkView: async (token: string): Promise<LinkViewResponse> => {
    const response = await api.get(`/link/view?token=${token}`);
    return response.data;
  },
};
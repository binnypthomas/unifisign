import api from './axiosInstance'; // ✅ use shared instance

export interface ChecklistItem {
  id: number;
  type: 'checkbox' | 'text' | 'textarea' | 'radio' | 'select' | 'multi-select' | 'email';
  text: string;
  required: boolean;
  options?: string[];
}

export interface DocumentTokenResponse {
  token: string;
  title: string;
  description: string;
  pdf_url: string;
  signer_name: string;
  sign_type: 1 | 2 | 3; // 1: Last Page, 2: First and Last Page, 3: All Pages
  document_type: 1 | 2; // 1: Only Document (PDF), 2: Document with Checklist
  checklist: ChecklistItem[];
}

export interface SubmitDocumentRequest {
  token: string;
  responses: Record<string, any>;
  signatureData: string;
  ipAddress: string;
  browserSignature: string;
  browserName: string;
  isMobile: 0 | 1; // 1: Mobile, 0: Desktop
  deviceType: string;
  deviceOs: string;
}

export interface SubmitDocumentResponse {
  success: boolean;
  download_url: string;
}

export interface DownloadDocumentResponse {
  success: boolean;
  download_url: string;
}

export const publicAPI = {
  /**
   * Get document metadata by token for signing
   * Token is encrypted ID using symmetric encryption (AES)
   */
  getDocumentByToken: async (token: string): Promise<DocumentTokenResponse> => {
    const response = await api.get(`/public/document/token?token=${token}`);
    return response.data;
  },

  /**
   * Submit signed document with filled responses
   */
  submitSignedDocument: async (data: SubmitDocumentRequest): Promise<SubmitDocumentResponse> => {
    const response = await api.post('/public/document/submit/token', data);
    return response.data;
  },

  /**
   * Download signed document by token
   * Returns file stream or download URL
   */
  downloadSignedDocument: async (token: string): Promise<DownloadDocumentResponse> => {
    const response = await api.get(`/public/document/download/token?token=${token}`);
    return response.data;
  },
};
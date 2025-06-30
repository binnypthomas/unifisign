import api from './axiosInstance'; // ✅ use shared instance

export interface SignatureItem {
  token: string;
  url: string;
}

export const signatureAPI = {
  /**
   * Upload signature image
   */
  saveSignature: async (file: File): Promise<{ success: boolean; signature_id: number }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/signature/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * List saved signatures of logged in user
   */
  getSignatureList: async (): Promise<{ success: boolean; signatures: SignatureItem[] }> => {
    const response = await api.get('/signature/list');
    return response.data;
  },
};
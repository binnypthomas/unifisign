import api from './axiosInstance'; // ✅ use shared instance

export interface AdminAnalytics {
  totalUsers: number;
  totalDocuments: number;
  totalSignatures: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  userGrowth: number;
  documentGrowth: number;
}

export interface AdminUser {
  id: number;
  email: string;
  displayName: string;
  role: number;
  roleName: string;
  subscription: string;
  createdAt: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface AdminSubscription {
  id: string;
  user_id: string;
  user_name: string;
  plan: string;
  subscribed_date: string;
  renewal_date: string;
  status: 'active' | 'inactive' | 'cancelled';
  amount: number;
}

export interface AdminArtifact {
  id: string;
  document_title: string;
  signer_name: string;
  signer_email: string;
  signed_date: string;
  document_type: string;
  template_owner: string;
  status: 'completed' | 'pending' | 'expired';
}

export const adminAPI = {
  /**
   * Get analytics data for admin dashboard
   */
  getAnalytics: async (): Promise<{ success: boolean; data: AdminAnalytics }> => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  /**
   * Get all registered users with their plans
   */
  getUsers: async (params?: {
    search?: string;
    role?: number;
    subscription?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; users: AdminUser[]; total: number }> => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  /**
   * Get list of all subscriptions with start and renewal dates
   */
  getSubscriptions: async (params?: {
    plan?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; subscriptions: AdminSubscription[]; total: number }> => {
    const response = await api.get('/admin/subscription/list', { params });
    return response.data;
  },

  /**
   * Get all signed artifacts/documents
   */
  getArtifacts: async (params?: {
    search?: string;
    document_type?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; artifacts: AdminArtifact[]; total: number }> => {
    const response = await api.get('/admin/artifacts/list', { params });
    return response.data;
  },
};
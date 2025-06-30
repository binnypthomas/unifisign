import api from './axiosInstance'; // ✅ use shared instance
import { User } from '../types';

export interface DashboardSummary {
  totalDocuments: number;
  totalDocumentsChange: string;
  activeSigners: number;
  activeSignersChange: string;
  completed: number;
  completedChange: string;
  pending: number;
  pendingChange: string;
  totalUsers: number;
  totalUsersChange: string;
  totalLinks: number;
  totalLinksChange: string;
}

export interface DashboardDocument {
  title: string;
  type: 'checklist' | 'webform' | 'pdf';
  status: 'completed' | 'pending' | 'expired';
  signer: {
    name?: string;
    email: string;
  };
  createdOn: string;
  signedOn?: string;
  link: string;
}

export interface DashboardActivity {
  title: string;
  time: string;
  action: string;
  email?: string;
}

export interface DashboardData {
  success: boolean;
  summary: DashboardSummary;
  documents: DashboardDocument[];
  activity: DashboardActivity[];
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan: string;
  subscribed_date: string;
  renewal_date: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  email?: string;
  profileImage?: string;
}

export const userAPI = {
  /**
   * Get dashboard data for user
   */
  getDashboard: async (): Promise<DashboardData> => {
    const response = await api.get('/user/dashboard');
    return response.data;
  },

  /**
   * List all links created by user (searchable, sortable, pagination)
   */
  getUserLinks: async (params?: {
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ success: boolean; links: any[]; total: number }> => {
    const response = await api.get('/user/link/list', { params });
    return response.data;
  },

  /**
   * Get user subscription details
   */
  getSubscription: async (): Promise<{ success: boolean; subscription: UserSubscription }> => {
    const response = await api.get('/user/subscription');
    return response.data;
  },

  /**
   * List all signatures of logged in user
   */
  getUserSignatures: async (): Promise<{ success: boolean; signatures: any[] }> => {
    const response = await api.get('/user/signatures/list');
    return response.data;
  },

  /**
   * Get user profile (same as /auth/me)
   */
  getProfile: async (): Promise<{ success: boolean; user: User }> => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  /**
   * Update user profile information
   */
  updateProfile: async (data: UpdateProfileRequest): Promise<{ success: boolean; user: User }> => {
    const response = await api.post('/user/profile', data);
    return response.data;
  },
};
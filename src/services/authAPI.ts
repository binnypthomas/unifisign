import api from './axiosInstance'; // ✅ use shared instance
import { User } from '../types';

export interface RegisterRequest {
  email: string;
  password: string;
  requested_package_id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: number;
    role: 1 | 2 | 3 | 4;
    roleName: string;
    displayName: string;
    profileImage: string;
    subscription: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: User;
}

export interface TriggerVerificationResponse {
  success: boolean;
  message?: string;
}

export interface VerifyOTPResponse {
  success: boolean;
  message?: string;
  next?: string; // 'redirect_to_payment' for paid plans
  payment_required?: boolean; // Legacy support
  package_id?: number;
  stripe_client_secret?: string;
}

export const authAPI = {
  /**
   * Register a new user with selected plan
   * Default role will be 4 (Guest)
   * Triggers OTP to user email for verification
   */
  register: async (data: RegisterRequest): Promise<{ success: boolean; message?: string }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Trigger verification code to user email
   */
  triggerVerificationCode: async (email: string): Promise<TriggerVerificationResponse> => {
    const response = await api.post('/auth/triggerverificationcode', { email });
    return response.data;
  },

  /**
   * Verify OTP code - returns next step for payment flow
   */
  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    const response = await api.post('/auth/verifyotp', { email, otp });
    return response.data;
  },

  /**
   * Login user - sets HttpOnly, Secure, SameSite=Strict cookie
   */
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password });
    if (!response.data.success) {
      const error: any = new Error(response.data.message || 'Login failed');
      error.response = { data: response.data }; // attach message so catch block can read it
      throw error;
    }

    return response.data;
  },

  /**
   * Logout current session
   */
  logout: async (): Promise<{ success: boolean }> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * Get current authenticated user
   */
  me: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },
};
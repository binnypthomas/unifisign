import api from './axiosInstance';

export interface Package {
  id: number;
  name: string;
  price: number;
  currency: string;
  billing_cycle: 'monthly' | 'yearly';
  features: string[];
  max_documents: number;
  max_users: number;
  storage_limit: string;
  support_level: string;
  is_popular: boolean;
}

export interface CurrentSubscription {
  id: string;
  user_id: string;
  plan: string;
  subscribed_date: string;
  renewal_date: string;
  status: 'active' | 'inactive' | 'cancelled';
  auto_renew: boolean;
  amount: number;
  currency: string;
}

export interface SubscribeRequest {
  package_id: number;
  plan: string;
  payment_id: string; // Stripe PaymentIntent or CheckoutSession ID
}

export interface SubscribeResponse {
  success: boolean;
  new_plan: string;
  payment_url?: string;
  subscription_id?: string;
}

export interface BillingWebhookPayload {
  event_type: string;
  subscription_id: string;
  user_id: string;
  plan_id: number;
  status: string;
  amount: number;
  currency: string;
  timestamp: string;
  signature: string;
}

export const subscriptionAPI = {
  /**
   * Get all available subscription packages
   */
  getPackages: async (): Promise<Package[]> => {
    const response = await api.get('/packages');
    return response.data;
  },

  /**
   * Get current user subscription details
   */
  getCurrentSubscription: async (): Promise<CurrentSubscription> => {
    const response = await api.get('/subscription');
    return response.data;
  },

  /**
   * Subscribe to a new plan after successful payment
   */
  subscribe: async (data: SubscribeRequest): Promise<SubscribeResponse> => {
    const response = await api.post('/subscription/subscribe', data);
    return response.data;
  },

  /**
   * Cancel current subscription
   */
  cancelSubscription: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/subscription/cancel');
    return response.data;
  },

  /**
   * Update subscription (upgrade/downgrade)
   */
  updateSubscription: async (data: { plan_id: number }): Promise<SubscribeResponse> => {
    const response = await api.post('/subscription/update', data);
    return response.data;
  },

  /**
   * Get billing history
   */
  getBillingHistory: async (): Promise<{ success: boolean; history: any[] }> => {
    const response = await api.get('/billing/history');
    return response.data;
  },

  /**
   * Handle billing webhook (for internal use)
   */
  handleBillingWebhook: async (payload: BillingWebhookPayload): Promise<{ success: boolean }> => {
    const response = await api.post('/billing/webhook', payload);
    return response.data;
  },
};
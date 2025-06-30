import api from './axiosInstance';

export interface CreateCheckoutSessionRequest {
  price_id: string;
  success_url: string;
  cancel_url: string;
  mode: 'payment' | 'subscription';
}

export interface CreateCheckoutSessionResponse {
  success: boolean;
  sessionId: string;
  url: string;
}

export interface CheckoutSessionDetails {
  success: boolean;
  session_id: string;
  price_id: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  customer_email: string;
  subscription_id?: string;
}

export interface SubscriptionData {
  id: string;
  user_id: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  subscribed_date: string;
  renewal_date: string;
  auto_renew: boolean;
  amount: number;
  currency: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
}

export const stripeService = {
  /**
   * Create a Stripe checkout session via your backend API
   * POST /stripe/create-checkout-session
   */
  createCheckoutSession: async (data: CreateCheckoutSessionRequest): Promise<CreateCheckoutSessionResponse> => {
    const response = await api.post('/stripe/create-checkout-session', data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create checkout session');
    }
    
    return response.data;
  },

  /**
   * Get checkout session details by session ID
   * GET /stripe/checkout-session/:sessionId
   */
  getCheckoutSession: async (sessionId: string): Promise<CheckoutSessionDetails> => {
    const response = await api.get(`/stripe/checkout-session/${sessionId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to retrieve checkout session');
    }
    
    return response.data;
  },

  /**
   * Get session status by session ID - Updated to match your specification
   * GET /stripe/session-status?session_id=cs_test_...
   */
  getSubscription: async (sessionId: string) => {
    const response = await fetch(`/stripe/session-status?session_id=${sessionId}`);
    return await response.json();
  },

  /**
   * Get current user's subscription data
   * GET /user/subscription
   */
  getUserSubscription: async (): Promise<SubscriptionData | null> => {
    try {
      const response = await api.get('/user/subscription');
      return response.data.subscription;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null; // No subscription found
      }
      throw error;
    }
  },

  /**
   * Check if user has active subscription
   */
  hasActiveSubscription: async (): Promise<boolean> => {
    try {
      const subscription = await stripeService.getUserSubscription();
      return subscription?.status === 'active';
    } catch (error) {
      console.error('Error checking subscription status:', error);
      return false;
    }
  },

  /**
   * Get subscription status
   */
  getSubscriptionStatus: async (): Promise<string | null> => {
    try {
      const subscription = await stripeService.getUserSubscription();
      return subscription?.status || null;
    } catch (error) {
      console.error('Error getting subscription status:', error);
      return null;
    }
  },

  /**
   * Cancel subscription
   * POST /stripe/cancel-subscription
   */
  cancelSubscription: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/stripe/cancel-subscription');
    return response.data;
  },

  /**
   * Update subscription
   * POST /stripe/update-subscription
   */
  updateSubscription: async (data: { price_id: string }): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/stripe/update-subscription', data);
    return response.data;
  },

  /**
   * Get billing history
   * GET /stripe/billing-history
   */
  getBillingHistory: async (): Promise<{ success: boolean; history: any[] }> => {
    const response = await api.get('/stripe/billing-history');
    return response.data;
  },
};
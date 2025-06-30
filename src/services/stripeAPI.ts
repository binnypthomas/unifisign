import api from './axiosInstance';

export interface CreatePaymentIntentRequest {
  package_id: number;
  email: string;
}

export interface CreatePaymentIntentResponse {
  success: boolean;
  client_secret: string;
  amount: number;
  currency: string;
}

export interface ConfirmPaymentRequest {
  payment_intent_id: string;
  package_id: number;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  subscription_id?: string;
  message?: string;
}

export const stripeAPI = {
  /**
   * Create payment intent for subscription
   */
  createPaymentIntent: async (data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
    const response = await api.post('/stripe/create-payment-intent', data);
    return response.data;
  },

  /**
   * Confirm payment and activate subscription
   */
  confirmPayment: async (data: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> => {
    const response = await api.post('/stripe/confirm-payment', data);
    return response.data;
  },

  /**
   * Get subscription status
   */
  getSubscriptionStatus: async (): Promise<{ success: boolean; subscription: any }> => {
    const response = await api.get('/stripe/subscription-status');
    return response.data;
  },
};
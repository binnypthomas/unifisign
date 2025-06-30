// Main API service that exports all individual API services
export { authAPI } from './authAPI';
export { publicAPI } from './publicAPI';
export { documentAPI } from './documentAPI';
export { signatureAPI } from './signatureAPI';
export { linkAPI } from './linkAPI';
export { userAPI } from './userAPI';
export { adminAPI } from './adminAPI';
export { subscriptionAPI } from './subscriptionAPI';
export { stripeAPI } from './stripeAPI';

// Re-export types for convenience
export type {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
  AuthResponse,
  TriggerVerificationResponse,
  VerifyOTPResponse,
} from './authAPI';

export type {
  ChecklistItem,
  DocumentTokenResponse,
  SubmitDocumentRequest,
  SubmitDocumentResponse,
  DownloadDocumentResponse,
} from './publicAPI';

export type {
  AuditDetails,
  ChecklistOption,
  VisibilityCondition,
  ChecklistItemInput,
  CreateChecklistRequest,
  ChecklistResponse,
  ChecklistListItem,
  CreateTemplateRequest,
  TemplateListItem,
} from './documentAPI';

export type {
  SignatureItem,
} from './signatureAPI';

export type {
  CreateLinkRequest,
  CreateLinkResponse,
  LinkListItem,
  LinkStatusDetails,
  LinkStatusResponse,
} from './linkAPI';

export type {
  DashboardData,
  UserSubscription,
  UpdateProfileRequest,
} from './userAPI';

export type {
  AdminAnalytics,
  AdminUser,
  AdminSubscription,
  AdminArtifact,
} from './adminAPI';

export type {
  Package,
  CurrentSubscription,
  SubscribeRequest,
  SubscribeResponse,
  BillingWebhookPayload,
} from './subscriptionAPI';

export type {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
} from './stripeAPI';
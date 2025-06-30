export interface User {
  id: string;
  email: string;
  name: string;
  role: 1 | 2 | 3 | 4; // 1: SuperAdmin, 2: Admin, 3: User, 4: Guest
  createdAt: string;
  profileImage?: string;
  subscription?: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
  };
}

export interface Document {
  id: string;
  title: string;
  type: 'checklist' | 'webform' | 'pdf';
  status: 'draft' | 'active' | 'completed' | 'pending' | 'expired';
  createdAt: string;
  updatedAt: string;
  signedAt?: string;
  signerEmail?: string;
  signerName?: string;
  templateId?: string;
  token?: string;
  downloadUrl?: string;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  type: 'checklist' | 'webform' | 'pdf';
  fields: TemplateField[];
  createdAt: string;
  userId: string;
  token?: string;
  documentType: 1 | 2 | 3; // 1: Only Document (PDF), 2: Only Checklist, 3: Document with Checklist
}

export interface TemplateField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'date' | 'signature' | 'checkbox' | 'radio' | 'select' | 'multi-select' | 'textarea';
  label: string;
  name?: string;
  required: boolean;
  options?: { label: string; value: string }[];
  order: number;
  visibilityCondition?: {
    field_name: string;
    operator: string;
    value: string;
  };
}

export interface SigningLink {
  id: string;
  token: string;
  documentId: string;
  templateId: string;
  title: string;
  signee?: string;
  email?: string;
  mobile?: string;
  message?: string;
  isSingleUse: boolean;
  validFrom: string;
  validTill: string;
  used: boolean;
  createdAt: string;
  status: 'active' | 'expired' | 'used';
  signingUrl: string;
}

export interface Signature {
  id: string;
  token: string;
  url: string;
  createdAt: string;
  userId: string;
}

export interface Checklist {
  id: string;
  token: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ChecklistItem {
  id: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio' | 'select' | 'multi-select' | 'email' | 'date_time' | 'group';
  text: string;
  name?: string;
  options?: { label: string; value: string }[];
  required: boolean;
  order: number;
  items?: ChecklistItem[]; // For group type
  visibilityCondition?: {
    field_name: string;
    operator: string;
    value: string;
  };
}

export interface AuditTrail {
  id: string;
  documentId: string;
  action: string;
  ipAddress: string;
  browserSignature: string;
  browserName: string;
  isMobile: boolean;
  deviceType: string;
  deviceOs: string;
  timestamp: string;
  userId?: string;
  signerEmail?: string;
  details?: Record<string, any>;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  subscribedDate: string;
  renewalDate: string;
  autoRenew: boolean;
  amount: number;
  currency: string;
}

export interface Package {
  id: number;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxDocuments: number;
  maxUsers: number;
  storageLimit: string;
  supportLevel: string;
  isPopular: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

// Dashboard types
export interface DashboardStats {
  totalDocuments: number;
  activeSigners: number;
  completedDocuments: number;
  pendingDocuments: number;
  monthlyGrowth: {
    documents: number;
    signers: number;
    completed: number;
  };
}

export interface ActivityItem {
  id: string;
  type: 'signed' | 'pending' | 'expired' | 'created';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  email?: string;
}
// User Profile Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isOnline?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Subscription/Plan Types
export type PlanType = 'free' | 'pro' | 'agency' | 'enterprise';
export type BillingPeriod = 'month' | 'year';

export interface Plan {
  id: string;
  name: string;
  type: PlanType;
  description: string;
  price: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  planType: PlanType;
  price: number;
  billingPeriod: BillingPeriod;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  renewalDate: string;
  creditsUsed: number;
  creditsTotal: number;
  createdAt: string;
  updatedAt: string;
}

// Invoice/Billing History Types
export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  downloadUrl?: string;
}

// Credit History Types
export type CreditTransactionType = 'USAGE' | 'REFUND' | 'PURCHASE' | 'BONUS';

export interface CreditTransaction {
  id: string;
  type: CreditTransactionType;
  description: string;
  amount: number;
  balanceAfter: number;
  createdAt: string;
  resourceId: string | null;
}

export interface CreditHistoryMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreditHistoryResponse {
  data: CreditTransaction[];
  meta: CreditHistoryMeta;
}

// Project Types
export interface ProjectListing {
  title: string;
  description: string;
  keywords: string[];
}

export interface ProjectOutputs {
  images: string[];
  caption: string;
  listing?: ProjectListing;
}

export interface ProjectMeta {
  productContext: string;
  styleProfile: string;
  quantity: number;
  includeCaption?: string;
  includeListing?: string;
}

export interface Project {
  _id: string;
  name: string;
  thumbnail_url: string;
  outputs?: ProjectOutputs;
  meta?: ProjectMeta;
  createdAt: string;
}

// Bookmark Types
export type BookmarkType = 'image' | 'text';

export interface Bookmark {
  id: string;
  name: string;
  imageUrl: string;
  projectName?: string;
  createdAt: string;
}

export interface CreateBookmarkDto {
  projectId: string;
  type: BookmarkType;
  content: string;
}

// Settings Types
export interface ProfileSettings {
  fullName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePic?: string;
}

export interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ConnectedAccount {
  id: string;
  provider: 'shopify' | 'google' | 'facebook' | 'instagram';
  name: string;
  description: string;
  isConnected: boolean;
  iconUrl?: string;
}

// API Response Types
export interface ProfileResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePic?: string;
  status: string;
  roles: string;
  plan: string;
  credits_used: number;
  credits_total: number;
  renewal_date?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingHistoryResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  limit: number;
}

export interface ProjectsResponse {
  data: Project[];
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
}

export interface BookmarkData {
  _id: string;
  user: string;
  project: {
    _id: string;
    name: string;
    thumbnail_url: string;
  };
  type: 'image' | 'text';
  content: string;
  createdAt: string;
}

export interface BookmarksResponse {
  data: BookmarkData[];
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
}

export interface SettingsResponse {
  profile: ProfileSettings;
  connectedAccounts: ConnectedAccount[];
}

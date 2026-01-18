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
  thumbnailUrl: string;
  outputs: ProjectOutputs;
  meta: ProjectMeta;
  createdAt: string;
}

// Bookmark Types
export interface Bookmark {
  id: string;
  name: string;
  imageUrl: string;
  projectName?: string;
  createdAt: string;
}

// Settings Types
export interface ProfileSettings {
  fullName: string;
  email: string;
}

export interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  user: User;
  subscription: Subscription;
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

export interface BookmarksResponse {
  bookmarks: Bookmark[];
  total: number;
  page: number;
  limit: number;
}

export interface SettingsResponse {
  profile: ProfileSettings;
  connectedAccounts: ConnectedAccount[];
}

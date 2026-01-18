export type SubscriptionPlanTier = 'FREE' | 'BASIC' | 'PRO' | 'AGENCY' | 'MAX' | 'ENTERPRISE' | string;

export interface SubscriptionPlan {
  _id: string;
  name: string;
  tier: SubscriptionPlanTier;
  price: number;
  yearlyPrice?: number;
  creditsGiven: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

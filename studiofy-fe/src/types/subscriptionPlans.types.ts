export type SubscriptionPlanTier = 'FREE' | 'BASIC' | 'PRO' | 'MAX' | 'ENTERPRISE' | string;

export interface SubscriptionPlan {
  _id: string;
  name: string;
  tier: SubscriptionPlanTier;
  price: number;
  creditsGiven: number;
  description: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
}





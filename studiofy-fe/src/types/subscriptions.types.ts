export type SubscriptionPlanTier = 'FREE' | 'BASIC' | 'PRO' | 'MAX' | 'ENTERPRISE' | string;

export interface SubscriptionDashboardPlan {
  name: string;
  tier: SubscriptionPlanTier;
  price: number;
  status: string;
  renewsDate: string;
}

export interface SubscriptionDashboardUsage {
  balance: number;
  limit: number;
  percentage: number;
}

export interface SubscriptionDashboardUpgrade {
  name: string;
  tier: SubscriptionPlanTier;
  price: number;
}

export interface SubscriptionDashboardData {
  plan: SubscriptionDashboardPlan;
  usage: SubscriptionDashboardUsage;
  upgrade: SubscriptionDashboardUpgrade;
}



'use client';

import { useQuery } from '@tanstack/react-query';
import { getSubscriptionDashboard } from '@/api/subscriptions.api';

export const SUBSCRIPTION_DASHBOARD_QUERY_KEY = ['subscription-dashboard'];

export function useSubscriptionDashboard() {
  return useQuery({
    queryKey: SUBSCRIPTION_DASHBOARD_QUERY_KEY,
    queryFn: getSubscriptionDashboard,
    staleTime: 5 * 60 * 1000,
  });
}



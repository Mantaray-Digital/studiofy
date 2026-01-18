'use client';

import { useQuery } from '@tanstack/react-query';
import { getSubscriptionPlans } from '@/api/subscriptionPlans.api';

export const SUBSCRIPTION_PLANS_QUERY_KEY = ['subscription-plans'];

export function useSubscriptionPlans() {
  return useQuery({
    queryKey: SUBSCRIPTION_PLANS_QUERY_KEY,
    queryFn: getSubscriptionPlans,
    staleTime: 5 * 60 * 1000,
  });
}





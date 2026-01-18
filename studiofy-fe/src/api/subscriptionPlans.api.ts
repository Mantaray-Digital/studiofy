'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { SubscriptionPlan } from '@/types/subscriptionPlans.types';

export async function getSubscriptionPlans(): Promise<Response<SubscriptionPlan[]>> {
  try {
    const response = await apiClient.get('/subscriptions/plans');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}





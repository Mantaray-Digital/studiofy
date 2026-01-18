'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { SubscriptionDashboardData } from '@/types/subscriptions.types';

export async function getSubscriptionDashboard(): Promise<Response<SubscriptionDashboardData>> {
  try {
    const response = await apiClient.get('/subscriptions/dashboard');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}



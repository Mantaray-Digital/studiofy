'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import {
  ProfileResponse,
  BillingHistoryResponse,
  ProjectsResponse,
  BookmarksResponse,
  SettingsResponse,
  ProfileSettings,
  SecuritySettings,
  Subscription,
} from '@/types/profile.types';

// Profile APIs
export async function getProfile(): Promise<Response<ProfileResponse>> {
  try {
    const response = await apiClient.get('/profile');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateProfile(
  data: Partial<ProfileSettings>
): Promise<Response<ProfileResponse>> {
  try {
    const response = await apiClient.patch('/profile', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Subscription APIs
export async function getSubscription(): Promise<Response<Subscription>> {
  try {
    const response = await apiClient.get('/subscription');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function cancelSubscription(): Promise<Response<Subscription>> {
  try {
    const response = await apiClient.post('/subscription/cancel');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function upgradePlan(
  planId: string,
  billingPeriod: 'month' | 'year'
): Promise<Response<Subscription>> {
  try {
    const response = await apiClient.post('/subscription/upgrade', {
      planId,
      billingPeriod,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Billing History APIs
export async function getBillingHistory(
  page = 1,
  limit = 10
): Promise<Response<BillingHistoryResponse>> {
  try {
    const response = await apiClient.get('/billing/history', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function downloadInvoice(invoiceId: string): Promise<Blob> {
  try {
    const response = await apiClient.get(`/billing/invoice/${invoiceId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Projects APIs
export async function getProjects(
  page = 1,
  limit = 10
): Promise<Response<ProjectsResponse>> {
  try {
    const response = await apiClient.get('/projects', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createProject(name: string): Promise<Response<{ id: string }>> {
  try {
    const response = await apiClient.post('/projects', { name });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteProject(projectId: string): Promise<Response<null>> {
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Bookmarks APIs
export async function getBookmarks(
  page = 1,
  limit = 10
): Promise<Response<BookmarksResponse>> {
  try {
    const response = await apiClient.get('/bookmarks', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function removeBookmark(bookmarkId: string): Promise<Response<null>> {
  try {
    const response = await apiClient.delete(`/bookmarks/${bookmarkId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Settings APIs
export async function getSettings(): Promise<Response<SettingsResponse>> {
  try {
    const response = await apiClient.get('/settings');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updatePassword(
  data: SecuritySettings
): Promise<Response<null>> {
  try {
    const response = await apiClient.post('/settings/password', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function connectAccount(
  provider: string
): Promise<Response<{ redirectUrl: string }>> {
  try {
    const response = await apiClient.post('/settings/connect', { provider });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function disconnectAccount(provider: string): Promise<Response<null>> {
  try {
    const response = await apiClient.post('/settings/disconnect', { provider });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteAccount(): Promise<Response<null>> {
  try {
    const response = await apiClient.delete('/profile');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

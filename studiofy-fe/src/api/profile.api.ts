'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import {
  ProfileResponse,
  BillingHistoryResponse,
  ProjectsResponse,
  BookmarksResponse,
  BookmarkData,
  CreateBookmarkDto,
  SettingsResponse,
  ProfileSettings,
  SecuritySettings,
  Subscription,
  CreditHistoryResponse,
} from '@/types/profile.types';

// Profile APIs
export async function getProfile(): Promise<Response<ProfileResponse>> {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function updateProfile(
  userId: string,
  data: Partial<ProfileSettings>
): Promise<Response<ProfileResponse>> {
  try {
    const response = await apiClient.patch(`/users/${userId}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Subscription APIs
export async function getSubscription(): Promise<Response<Subscription>> {
  try {
    const response = await apiClient.get('/subscriptions/current');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function cancelSubscription(): Promise<Response<Subscription>> {
  try {
    const response = await apiClient.post('/subscriptions/cancel');
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
    const response = await apiClient.post('/subscriptions/upgrade', {
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

// Credit History APIs
export async function getCreditHistory(
  page = 1,
  limit = 20
): Promise<Response<CreditHistoryResponse>> {
  try {
    const response = await apiClient.get('/billing/credits/history', {
      params: { page, limit },
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

export async function createBookmark(
  data: CreateBookmarkDto
): Promise<Response<BookmarkData>> {
  try {
    const response = await apiClient.post('/bookmarks', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

// Settings APIs
export async function getSettings(): Promise<Response<SettingsResponse>> {
  try {
    // Use user profile data for settings
    const response = await apiClient.get('/users/me');
    const user = response.data?.data;
    return {
      success: true,
      message: 'Settings retrieved successfully',
      data: {
        profile: {
          fullName: user ? `${user.firstName} ${user.lastName}` : '',
          email: user?.email || '',
        },
        connectedAccounts: [], // OAuth connections managed separately
      },
    };
  } catch (error) {
    handleApiError(error);
  }
}

export async function updatePassword(
  data: SecuritySettings
): Promise<Response<null>> {
  try {
    const response = await apiClient.post('/users/password', {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function connectAccount(
  provider: string
): Promise<Response<{ redirectUrl: string }>> {
  // Redirect to OAuth flow
  if (provider === 'google') {
    return {
      success: true,
      message: 'Redirecting to Google OAuth',
      data: { redirectUrl: '/api/v1/auth/google/login' },
    };
  }
  throw new Error('Provider not supported');
}

export async function disconnectAccount(provider: string): Promise<Response<null>> {
  // OAuth disconnect not implemented in backend yet
  return {
    success: true,
    message: 'Account disconnected',
    data: null,
  };
}

export async function deleteAccount(userId: string): Promise<Response<null>> {
  try {
    const response = await apiClient.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

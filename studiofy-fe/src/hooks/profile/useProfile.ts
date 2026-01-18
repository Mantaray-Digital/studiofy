'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getProfile,
  updateProfile,
  getSubscription,
  cancelSubscription,
  getBillingHistory,
  downloadInvoice,
} from '@/api/profile.api';
import { ProfileSettings } from '@/types/profile.types';

export const PROFILE_QUERY_KEY = ['profile'];
export const SUBSCRIPTION_QUERY_KEY = ['subscription'];
export const BILLING_HISTORY_QUERY_KEY = ['billing-history'];

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  const TOAST_ID = 'update-profile-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<ProfileSettings>) => updateProfile(data),
    onMutate: () => {
      toast.loading('Updating profile...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Profile updated successfully', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to update profile', { id: TOAST_ID });
    },
  });
}

export function useSubscription() {
  return useQuery({
    queryKey: SUBSCRIPTION_QUERY_KEY,
    queryFn: getSubscription,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCancelSubscription() {
  const TOAST_ID = 'cancel-subscription-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSubscription,
    onMutate: () => {
      toast.loading('Cancelling subscription...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Subscription cancelled', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTION_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to cancel subscription', { id: TOAST_ID });
    },
  });
}

export function useBillingHistory(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...BILLING_HISTORY_QUERY_KEY, page, limit],
    queryFn: () => getBillingHistory(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDownloadInvoice() {
  const TOAST_ID = 'download-invoice-toast';

  return useMutation({
    mutationFn: (invoiceId: string) => downloadInvoice(invoiceId),
    onMutate: () => {
      toast.loading('Downloading invoice...', { id: TOAST_ID });
    },
    onSuccess: (blob, invoiceId) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Invoice downloaded', { id: TOAST_ID });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to download invoice', { id: TOAST_ID });
    },
  });
}

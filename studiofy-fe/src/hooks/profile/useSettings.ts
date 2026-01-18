'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  getSettings,
  updatePassword,
  connectAccount,
  disconnectAccount,
  deleteAccount,
} from '@/api/profile.api';
import { SecuritySettings } from '@/types/profile.types';

export const SETTINGS_QUERY_KEY = ['settings'];

export function useSettings() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: getSettings,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdatePassword() {
  const TOAST_ID = 'update-password-toast';

  return useMutation({
    mutationFn: (data: SecuritySettings) => updatePassword(data),
    onMutate: () => {
      toast.loading('Updating password...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Password updated successfully', { id: TOAST_ID });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to update password', { id: TOAST_ID });
    },
  });
}

export function useConnectAccount() {
  const TOAST_ID = 'connect-account-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (provider: string) => connectAccount(provider),
    onMutate: () => {
      toast.loading('Connecting account...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      if (data?.data?.redirectUrl) {
        window.location.href = data.data.redirectUrl;
      }
      toast.success(data?.message || 'Account connected', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to connect account', { id: TOAST_ID });
    },
  });
}

export function useDisconnectAccount() {
  const TOAST_ID = 'disconnect-account-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (provider: string) => disconnectAccount(provider),
    onMutate: () => {
      toast.loading('Disconnecting account...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Account disconnected', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to disconnect account', { id: TOAST_ID });
    },
  });
}

export function useDeleteAccount() {
  const TOAST_ID = 'delete-account-toast';
  const router = useRouter();

  return useMutation({
    mutationFn: (userId: string) => deleteAccount(userId),
    onMutate: () => {
      toast.loading('Deleting account...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Account deleted', { id: TOAST_ID });
      // Clear tokens and redirect to home
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
      }
      router.push('/');
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to delete account', { id: TOAST_ID });
    },
  });
}

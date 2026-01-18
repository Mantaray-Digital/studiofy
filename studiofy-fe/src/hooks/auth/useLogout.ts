'use client';

import { logout } from '@/api/auth.api';
import { Response } from '@/types/response/Response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const TOAST_ID = 'logout-toast';
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Response<null>, Response<null>>({
    mutationFn: async () => logout(),

    onMutate: () => {
      toast.loading('Signing out...', { id: TOAST_ID });
    },

    onSuccess: (data) => {
      // Clear tokens from sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
      }

      // Clear all cached queries
      queryClient.clear();

      const successMessage = data?.message || 'Logged out successfully';
      toast.success(successMessage, { id: TOAST_ID });

      // Redirect to login page
      router.push('/login');
    },

    onError: (error) => {
      // Even if the API call fails, clear local tokens and redirect
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('refresh_token');
      }
      queryClient.clear();

      if (error?.error) {
        toast.error(error.error.details, { id: TOAST_ID });
      } else {
        toast.success('Logged out successfully', { id: TOAST_ID });
      }

      router.push('/login');
    },
  });

  return { logout: mutate, isPending };
}

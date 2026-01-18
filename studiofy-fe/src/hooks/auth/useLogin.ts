'use client';

import { login } from '@/api/auth.api';
import { createLoginFormData } from '@/schema/auth/login.schema';
import { AuthTokens } from '@/types/Auth/AuthTokens.type';
import { Response } from '@/types/response/Response.type';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const TOAST_ID = 'login-toast';
  const router = useRouter();

  const { mutate, isError, error, isPending } = useMutation<
    Response<AuthTokens>,
    Response<null>,
    createLoginFormData
  >({
    mutationFn: async (form: createLoginFormData) => login(form),

    onMutate: () => {
      toast.loading('Logging in...', { id: TOAST_ID });
    },

    onSuccess: (data) => {
      if (data?.data?.accessToken && typeof window !== 'undefined') {
        sessionStorage.setItem('access_token', data.data.accessToken);
        if (data.data.refreshToken) {
          sessionStorage.setItem('refresh_token', data.data.refreshToken);
        }
      }
      const successMessage = data?.message || 'Logged in successfully';
      toast.success(successMessage, { id: TOAST_ID });
      router.push('/');
    },

    onError: (error) => {
      if (error.error) toast.error(error.error.details, { id: TOAST_ID });
    },
  });

  return { login: mutate, isPending, error, isError };
}


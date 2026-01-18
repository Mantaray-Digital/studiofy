'use client';

import { register } from '@/api/auth.api';
import { RegisterInput } from '@/schema/auth/signup.schema';
import { AuthTokens } from '@/types/Auth/AuthTokens.type';
import { Response } from '@/types/response/Response.type';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useSignUp() {
  const TOAST_ID = 'signup-toast';
  const router = useRouter();

  const { mutate, isError, error, isPending } = useMutation<
    Response<AuthTokens>,
    Response<null>,
    RegisterInput
  >({
    mutationFn: async (form: RegisterInput) => register(form),

    onMutate: () => {
      toast.loading('Registering ...', { id: TOAST_ID });
    },

    onSuccess: (data) => {
      const successMessage = data?.message || 'User registered successfully';
      toast.success(successMessage, { id: TOAST_ID });
      router.push('/login');
    },

    onError: (error) => {
      if (error.error) toast.error(error.error.details, { id: TOAST_ID });
    },
  });

  return { register: mutate, isPending, error, isError };
}


'use client';

import { resetPassword } from '@/api/auth.api';
import { ResetPasswordInput } from '@/schema/auth/reset-password.schema';
import { Response } from '@/types/response/Response.type';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useResetPassword() {
  const TOAST_ID = 'reset-password-toast';
  const router = useRouter();

  const { mutate, isError, error, isPending } = useMutation<
    Response<null>,
    Response<null>,
    ResetPasswordInput
  >({
    mutationFn: async (form: ResetPasswordInput) => resetPassword(form),

    onMutate: () => {
      toast.loading('Sending reset link...', { id: TOAST_ID });
    },

    onSuccess: (data, variables) => {
      const successMessage = data?.message || 'Password reset token sent successfully';
      toast.success(successMessage, { id: TOAST_ID });
      // Redirect to verify-email page with email parameter
      router.push(`/verify-email?email=${encodeURIComponent(variables.email)}`);
    },

    onError: (error) => {
      if (error.error) toast.error(error.error.details, { id: TOAST_ID });
    },
  });

  return { resetPassword: mutate, isPending, error, isError };
}


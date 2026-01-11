'use client';

import { verifyEmail, requestVerificationCode } from '@/api/auth.api';
import { VerifyEmailInput } from '@/schema/auth/verify-email.schema';
import { Response } from '@/types/response/Response.type';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function useVerifyEmail() {
  const TOAST_ID = 'verify-email-toast';
  const router = useRouter();

  const { mutate: verify, isPending: isVerifying } = useMutation<
    Response<null>,
    Response<null>,
    VerifyEmailInput
  >({
    mutationFn: async (form: VerifyEmailInput) => verifyEmail(form),

    onMutate: () => {
      toast.loading('Verifying email...', { id: TOAST_ID });
    },

    onSuccess: (data) => {
      const successMessage = data?.message || 'Password reset successfully';
      toast.success(successMessage, { id: TOAST_ID });
      router.push('/login');
    },

    onError: (error) => {
      if (error.error) {
        const errorMessage = error.error.details || '';
        // Check if error is related to OTP/token validation
        const isOtpError = 
          errorMessage.toLowerCase().includes('token') ||
          errorMessage.toLowerCase().includes('code') ||
          errorMessage.toLowerCase().includes('otp') ||
          errorMessage.toLowerCase().includes('resettoken') ||
          errorMessage.toLowerCase().includes('bad request') ||
          errorMessage.toLowerCase().includes('invalid') ||
          errorMessage.toLowerCase().includes('validation');
        
        if (isOtpError) {
          toast.error('OTP code is incorrect. Please check and try again.', { id: TOAST_ID });
        } else {
          toast.error(errorMessage, { id: TOAST_ID });
        }
      } else {
        toast.error('An error occurred. Please try again.', { id: TOAST_ID });
      }
    },
  });

  const { mutate: requestCode, isPending: isRequesting } = useMutation<
    Response<null>,
    Response<null>,
    string | undefined
  >({
    mutationFn: async (email?: string) => requestVerificationCode(email),

    onMutate: () => {
      toast.loading('Sending verification code...', { id: TOAST_ID });
    },

    onSuccess: () => {
      toast.success('Verification code sent!', { id: TOAST_ID });
    },

    onError: (error) => {
      if (error.error) {
        toast.error(error.error.details, { id: TOAST_ID });
      } else {
        toast.error('An error occurred. Please try again.', { id: TOAST_ID });
      }
    },
  });

  return {
    verify,
    requestCode,
    isPending: isVerifying || isRequesting,
  };
}


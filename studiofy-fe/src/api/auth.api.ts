'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { createLoginFormData } from '@/schema/auth/login.schema';
import { RegisterInput } from '@/schema/auth/signup.schema';
import { AuthTokens } from '@/types/Auth/AuthTokens.type';
import { VerifyEmailInput } from '@/schema/auth/verify-email.schema';
import { ResetPasswordInput } from '@/schema/auth/reset-password.schema';

export async function login(
  credentials: createLoginFormData,
): Promise<Response<AuthTokens>> {
  try {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function logout(): Promise<Response<null>> {
  try {
    const response = await apiClient.post('/auth/signout');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function requestVerificationCode(
  email?: string,
): Promise<Response<null>> {
  try {
    const response = email
      ? await apiClient.get(`/auth/verify-email?email=${encodeURIComponent(email)}`)
      : await apiClient.get('/auth/verify-email');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function verifyEmail(
  data: VerifyEmailInput,
): Promise<Response<null>> {
  try {
    // Map verify-email data to reset-password endpoint format
    const resetPasswordData = {
      password: data.password,
      resetToken: data.code,
    };
    const response = await apiClient.post('/auth/reset-password', resetPasswordData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function resetPassword(
  data: ResetPasswordInput,
): Promise<Response<null>> {
  try {
    const response = await apiClient.post('/auth/forgot-password', data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export const register = async (
  register: RegisterInput,
): Promise<Response<AuthTokens>> => {
  try {
    const response = await apiClient.post('/auth/signup', register);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export async function refreshToken(): Promise<Response<AuthTokens>> {
  try {
    const response = await apiClient.post('/auth/refresh-token');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}


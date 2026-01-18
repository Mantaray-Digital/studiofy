'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { Style } from '@/types/styles.types';

export async function getStyles(): Promise<Response<Style[]>> {
  try {
    const response = await apiClient.get('/styles');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getFreeStyles(): Promise<Response<Style[]>> {
  try {
    const response = await apiClient.get('/styles/free');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getPremiumStyles(): Promise<Response<Style[]>> {
  try {
    const response = await apiClient.get('/styles/premium');
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

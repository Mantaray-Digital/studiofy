'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { GenerateInput, GeneratedProject } from '@/types/generate';

export async function generateAssets(
  input: GenerateInput
): Promise<Response<GeneratedProject>> {
  try {
    const formData = new FormData();
    formData.append('prompt', input.prompt);
    formData.append('image', input.image);

    if (input.styleId) {
      formData.append('styleId', input.styleId);
    }

    if (input.quantity) {
      formData.append('quantity', input.quantity.toString());
    }

    const response = await apiClient.post('/generate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

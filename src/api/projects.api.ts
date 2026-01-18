'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { ProjectsResponse } from '@/types/projects.types';

export async function getProjects(
  page = 1,
  limit = 20
): Promise<Response<ProjectsResponse>> {
  try {
    const response = await apiClient.get('/projects', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}



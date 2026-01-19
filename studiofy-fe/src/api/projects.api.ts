'use client';

import apiClient from '@/utils/apiClient';
import { handleApiError } from '@/utils/handleApiError';
import { Response } from '@/types/response/Response.type';
import { Project, ProjectsResponse } from '@/types/projects.types';

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

export async function getProject(projectId: string): Promise<Response<Project>> {
  try {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createProject(name: string): Promise<Response<Project>> {
  try {
    const response = await apiClient.post('/projects', { name });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteProject(projectId: string): Promise<Response<null>> {
  try {
    const response = await apiClient.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}

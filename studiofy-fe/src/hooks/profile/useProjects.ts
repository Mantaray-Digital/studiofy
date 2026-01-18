'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getProjects, createProject, deleteProject } from '@/api/profile.api';

export const PROJECTS_QUERY_KEY = ['projects'];

export function useProjects(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, page, limit],
    queryFn: () => getProjects(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateProject() {
  const TOAST_ID = 'create-project-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createProject(name),
    onMutate: () => {
      toast.loading('Creating project...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Project created successfully', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to create project', { id: TOAST_ID });
    },
  });
}

export function useDeleteProject() {
  const TOAST_ID = 'delete-project-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onMutate: () => {
      toast.loading('Deleting project...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Project deleted', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to delete project', { id: TOAST_ID });
    },
  });
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/api/projects.api';

export const PROJECTS_QUERY_KEY = ['projects'];

export function useProjects(page = 1, limit = 20) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, page, limit],
    queryFn: () => getProjects(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}



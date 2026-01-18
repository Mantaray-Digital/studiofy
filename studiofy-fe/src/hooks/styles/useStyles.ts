'use client';

import { useQuery } from '@tanstack/react-query';
import { getStyles, getFreeStyles, getPremiumStyles } from '@/api/styles.api';

export const STYLES_QUERY_KEY = ['styles'];
export const FREE_STYLES_QUERY_KEY = ['styles', 'free'];
export const PREMIUM_STYLES_QUERY_KEY = ['styles', 'premium'];

export function useStyles() {
  return useQuery({
    queryKey: STYLES_QUERY_KEY,
    queryFn: getStyles,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFreeStyles() {
  return useQuery({
    queryKey: FREE_STYLES_QUERY_KEY,
    queryFn: getFreeStyles,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePremiumStyles() {
  return useQuery({
    queryKey: PREMIUM_STYLES_QUERY_KEY,
    queryFn: getPremiumStyles,
    staleTime: 5 * 60 * 1000,
  });
}

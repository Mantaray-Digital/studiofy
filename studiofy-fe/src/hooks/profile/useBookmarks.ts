'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBookmarks, removeBookmark, createBookmark } from '@/api/profile.api';
import { CreateBookmarkDto } from '@/types/profile.types';

export const BOOKMARKS_QUERY_KEY = ['bookmarks'];

export function useBookmarks(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...BOOKMARKS_QUERY_KEY, page, limit],
    queryFn: () => getBookmarks(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRemoveBookmark() {
  const TOAST_ID = 'remove-bookmark-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: string) => removeBookmark(bookmarkId),
    onMutate: () => {
      toast.loading('Removing bookmark...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Bookmark removed', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to remove bookmark', { id: TOAST_ID });
    },
  });
}

export function useCreateBookmark() {
  const TOAST_ID = 'create-bookmark-toast';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookmarkDto) => createBookmark(data),
    onMutate: () => {
      toast.loading('Adding bookmark...', { id: TOAST_ID });
    },
    onSuccess: (data) => {
      toast.success(data?.message || 'Item bookmarked successfully', { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: BOOKMARKS_QUERY_KEY });
    },
    onError: (error: { error?: { details?: string } }) => {
      toast.error(error?.error?.details || 'Failed to bookmark item', { id: TOAST_ID });
    },
  });
}

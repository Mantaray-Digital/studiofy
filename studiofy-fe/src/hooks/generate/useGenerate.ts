'use client';

import { generateAssets } from '@/api/generate.api';
import { GenerateInput, GeneratedProject } from '@/types/generate';
import { Response } from '@/types/response/Response.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function useGenerate() {
  const TOAST_ID = 'generate-toast';
  const queryClient = useQueryClient();

  const {
    mutate,
    mutateAsync,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useMutation<Response<GeneratedProject>, Response<null>, GenerateInput>({
    mutationFn: async (input: GenerateInput) => generateAssets(input),

    onMutate: () => {
      toast.loading('Generating your images...', { id: TOAST_ID });
    },

    onSuccess: (data) => {
      const successMessage = data?.message || 'Images generated successfully';
      toast.success(successMessage, { id: TOAST_ID });

      // Invalidate projects query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      // Invalidate profile to refresh credits
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },

    onError: (error) => {
      const errorMessage =
        error?.error?.details || 'Failed to generate images';
      toast.error(errorMessage, { id: TOAST_ID });
    },
  });

  return {
    generate: mutate,
    generateAsync: mutateAsync,
    generatedProject: data?.data,
    isPending,
    isSuccess,
    error,
    isError,
  };
}

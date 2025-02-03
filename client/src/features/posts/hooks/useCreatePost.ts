import { apiClient } from '@src/api';
import { PostCreate } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: PostCreate; reset: () => void }) => {
      await apiClient.posts.create(data);
    },
    onSuccess: (_, { reset }) => {
      queryClient.invalidateQueries({ queryKey: ['posts_table'] });
      toast.success('New post was created successfully.');
      reset();
    }
  });
};

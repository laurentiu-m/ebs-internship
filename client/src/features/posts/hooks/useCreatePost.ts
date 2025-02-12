import { apiClient } from '@src/api';
import { PostCreate } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: { data: PostCreate }) => {
      await apiClient.posts.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts_table'] });
    }
  });
};

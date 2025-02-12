import { apiClient } from '@src/api';
import { PostCreate } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, postId }: { data: PostCreate; postId: string }) => {
      await apiClient.posts.edit(data, postId);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_post_${postId}`] });
    }
  });
};

import { apiClient } from '@src/api';
import { PostCreate } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, postId }: { data: PostCreate; postId: number }) => {
      await apiClient.posts.edit(data, postId);
    },
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_post_${postId}`] });
      queryClient.invalidateQueries({ queryKey: ['posts_table'] });
      toast.success('Post details updated successfully.');
    }
  });
};

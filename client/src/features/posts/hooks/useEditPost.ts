import { apiClient } from '@src/api';
import { PostHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useEditPost = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, postId }: PostHook) => {
      await apiClient.posts.edit(data, postId!);
    },
    onSuccess: (_, { postId, onClose }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_post_${postId}`] });
      queryClient.invalidateQueries({ queryKey: ['posts_table'] });
      toast.success(t('notification.post_edit'));
      onClose();
    }
  });
};

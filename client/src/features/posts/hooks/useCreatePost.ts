import { apiClient } from '@src/api';
import { PostHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useCreatePost = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: PostHook) => {
      await apiClient.posts.create(data);
    },
    onSuccess: (_, { onClose }) => {
      queryClient.invalidateQueries({ queryKey: ['posts_table'] });
      toast.success(t('notification.post_create'));
      onClose();
    }
  });
};

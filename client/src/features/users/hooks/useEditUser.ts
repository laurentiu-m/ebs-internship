import { apiClient } from '@src/api';
import { UserHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { apiErrors } from '../utils/apiErrors';

export const useEditUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: UserHook) => {
      if (userId) {
        await apiClient.users.update(userId, data);
        toast.success(t('notification.user_edit'));
      }
    },
    onSuccess: async (_, { userId, onClose }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_user_${userId}`] });
      queryClient.invalidateQueries({ queryKey: ['user_table'] });
      onClose();
    },
    onError: (err, { setError }) => {
      apiErrors(err, setError);
    }
  });
};

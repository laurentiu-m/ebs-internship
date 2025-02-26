import { apiClient } from '@src/api';
import { UserHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { apiErrors } from '../utils/apiErrors';

export const useCreateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data }: UserHook) => {
      await apiClient.users.create(data);
      toast.success(t('notification.user_create'));
    },
    onSuccess: (_, { onClose }) => {
      queryClient.invalidateQueries({ queryKey: ['user_table'] });
      onClose();
    },
    onError: (err, { setError }) => {
      apiErrors(err, setError);
    }
  });
};

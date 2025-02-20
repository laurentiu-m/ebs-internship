import { apiClient } from '@src/api';
import { UserCreateForm, UserHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
      if (err instanceof AxiosError) {
        const errData = err.response?.data;

        if (errData.error === 'form_invalid') {
          errData.fields.forEach((error: { field: keyof UserCreateForm; message: string }) => {
            setError(error.field, { type: 'server', message: error.message });
          });
          throw new Error('Validation error');
        }
        setError(errData.field, { type: errData.type, message: errData.messageKey });
      }
    }
  });
};

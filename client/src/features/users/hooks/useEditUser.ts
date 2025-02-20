import { apiClient } from '@src/api';
import { UserCreateForm, UserHook } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useEditUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: UserHook) => {
      await apiClient.users.update(userId!, data);
      toast.success(t('notification.user_edit'));
    },
    onSuccess: async (_, { userId, onClose }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_user_${userId}`] });
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
          return;
        }
        setError(errData.field, { type: errData.type, message: errData.messageKey });
      }
    }
  });
};

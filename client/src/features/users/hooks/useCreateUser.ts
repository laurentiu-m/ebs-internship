import { apiClient } from '@src/api';
import { UserCreate, UserCreateForm } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const useCreateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      setError
    }: {
      data: UserCreate;
      setError: UseFormSetError<UserCreateForm>;
      onCloseModal: () => void;
    }) => {
      try {
        await apiClient.users.create(data);
        toast.success(t('notification.user_create'));
      } catch (err) {
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
        throw err;
      }
    },
    onSuccess: (_, { onCloseModal }) => {
      queryClient.invalidateQueries({ queryKey: ['user_table'] });
      onCloseModal();
    }
  });
};

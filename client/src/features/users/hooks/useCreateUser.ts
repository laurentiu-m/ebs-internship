import { apiClient } from '@src/api';
import { UserCreate, UserCreateForm } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, setError }: { data: UserCreate; setError: UseFormSetError<UserCreateForm> }) => {
      try {
        await apiClient.users.create(data);
      } catch (err) {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user_table'] });
    }
  });
};

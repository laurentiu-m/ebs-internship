import { apiClient } from '@src/api';
import { UserCreate, UserCreateForm } from '@src/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
      setError
    }: {
      userId: string;
      data: UserCreate;
      setError: UseFormSetError<UserCreateForm>;
    }) => {
      try {
        await apiClient.users.update(userId, data);
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
        throw err;
      }
    },
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: [`edit_user_${userId}`] });
    }
  });
};

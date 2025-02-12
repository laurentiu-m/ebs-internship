import { apiClient } from '@src/api';
import { UserCreateForm, UserFormSubmit } from '@src/types';
import { AxiosError } from 'axios';

export const editUser: UserFormSubmit = async (data, setError, userId) => {
  if (!userId) return;

  try {
    await apiClient.users.update(userId, data);
    alert('User was edited');
    return false;
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
};

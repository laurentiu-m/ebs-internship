import { apiClient } from '@src/api';
import { UserCreateForm, UserFormSubmit } from '@src/types';
import { AxiosError } from 'axios';

export const createUser: UserFormSubmit = async (data, setError) => {
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
};

export const editUser: UserFormSubmit = async (data, setError, userId) => {
  if (!userId) return;

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
  }
};

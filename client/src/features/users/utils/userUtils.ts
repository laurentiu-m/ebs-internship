import { apiClient } from '@src/api';
import { UserRegisterForm, UserRegisterSubmit } from '@src/types';
import { AxiosError } from 'axios';

export const createUser: UserRegisterSubmit = async (data, setError) => {
  try {
    await apiClient.users.create(data);
    alert('User was created');
    return true;
  } catch (err) {
    if (err instanceof AxiosError) {
      const errData = err.response?.data;

      if (errData.error === 'form_invalid') {
        errData.fields.forEach((error: { field: keyof UserRegisterForm; message: string }) => {
          setError(error.field, { type: 'server', message: error.message });
        });
        return;
      }

      setError(errData.field, { type: errData.type, message: errData.messageKey });
    }
  }
};

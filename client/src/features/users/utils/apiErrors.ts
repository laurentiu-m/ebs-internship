import { UserCreateForm } from '@src/types';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export const apiErrors = (err: Error, setError: UseFormSetError<UserCreateForm>) => {
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
};

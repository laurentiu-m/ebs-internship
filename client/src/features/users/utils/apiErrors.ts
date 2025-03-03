import { UserCreateForm } from '@src/types';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export const apiErrors = (err: Error, setError: UseFormSetError<UserCreateForm>) => {
  if (err instanceof AxiosError) {
    const errData = err.response?.data;
    if (errData) {
      setError(errData.field, { type: errData.type, message: errData.message });
    }
  }
};

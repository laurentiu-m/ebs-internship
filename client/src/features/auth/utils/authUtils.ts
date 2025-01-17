import { apiClient } from '@src/api';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { UserLoginSubmit, UserRegisterSubmit, UserRegisterForm, UserLogin } from '@src/types';
import { AxiosError } from 'axios';

export const loginSubmit: UserLoginSubmit = async (data, setError, navigate) => {
  try {
    const token = await apiClient.users.login(data);

    localStorage.setItem(ACCESS_TOKEN, token);

    navigate(Routes.Dashboard);
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = err.response?.data.errors;
      errors.forEach(({ field, messageKey }: { field: keyof UserLogin; messageKey: string }) => {
        setError(field, { type: 'server', message: messageKey });
      });
    }
  }
};

export const registerSubmit: UserRegisterSubmit = async (registerData, setError, navigate) => {
  try {
    const token = await apiClient.users.create(registerData);

    localStorage.setItem(ACCESS_TOKEN, token);

    navigate(Routes.Dashboard);
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

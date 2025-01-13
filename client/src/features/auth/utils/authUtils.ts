import { apiClient } from '@src/api';
import { UserLoginSubmit, UserRegisterSubmit, UserRegisterForm, ACCESS_TOKEN, Routes, UserLogin } from '@src/types';
import { AxiosError } from 'axios';

export const loginSubmit: UserLoginSubmit = async (data, setError, navigate) => {
  try {
    const token = await apiClient.users.login(data);

    localStorage.setItem(ACCESS_TOKEN, token);

    navigate(Routes.Dashboard);
  } catch (err) {
    if (err instanceof AxiosError) {
      const errors = err.response?.data.errors;
      errors.forEach(({ field, message }: { field: keyof UserLogin; message: string }) => {
        setError(field, { type: 'server', message: message });
      });
    }
  }
};

export const registerSubmit: UserRegisterSubmit = async (data, setError, navigate) => {
  const { firstName, lastName, ...rest } = data;
  const registerData = { ...rest, name: `${firstName} ${lastName}` };

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

      setError(errData.field, { type: errData.type, message: errData.message });
    }
  }
};

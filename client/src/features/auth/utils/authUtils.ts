import { api } from '@api/index';
import { loginUser } from '@api/users';
import { AxiosError } from 'axios';
import { UserLoginSubmit, UserRegisterSubmit, UserRegisterForm } from 'src/types';

export const loginSubmit: UserLoginSubmit = async (data, setError, navigate) => {
  try {
    const response = await loginUser(data);

    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('userRole', response.role);

    if (response.role === 'user') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard-${response.role}`);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      setError('email', { type: 'server', message: err.response?.data.message });
      setError('password', { type: 'server', message: '' });
    } else {
      setError('email', { type: 'server', message: 'Something went wrong' });
      setError('password', { type: 'server', message: '' });
    }
  }
};

export const registerSubmit: UserRegisterSubmit = async (data, reset, setError) => {
  const { firstName, lastName, ...rest } = data;
  const registerData = { ...rest, name: `${firstName} ${lastName}` };

  try {
    await api.users.createUser(registerData);
    reset();
  } catch (err) {
    if (err instanceof AxiosError) {
      const errData = err.response?.data;

      if (errData.error === 'form_invalid') {
        errData.fields.map((error: { field: keyof UserRegisterForm; message: string }) => {
          setError(error.field, { type: 'server', message: error.message });
        });
        return;
      }

      setError(errData.field, { type: errData.type, message: errData.message });
    }
  }
};

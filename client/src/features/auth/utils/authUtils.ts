import { loginUser, createUser } from '@api';
import { AxiosError } from 'axios';
import { UserLoginSubmit, UserRegisterSubmit, UserRegisterForm, ACCESS_TOKEN, USER_ROLE } from '@types';

export const loginSubmit: UserLoginSubmit = async (data, setError, navigate) => {
  try {
    const response = await loginUser(data);

    localStorage.setItem(ACCESS_TOKEN, response.token);
    localStorage.setItem(USER_ROLE, response.role);

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

export const registerSubmit: UserRegisterSubmit = async (data, setError, navigate) => {
  const { firstName, lastName, ...rest } = data;
  const registerData = { ...rest, name: `${firstName} ${lastName}` };

  try {
    const response = await createUser(registerData);

    localStorage.setItem(ACCESS_TOKEN, response.token);
    localStorage.setItem(USER_ROLE, response.role);

    if (response.role === 'user') {
      navigate('/dashboard');
    } else {
      navigate(`/dashboard-${response.role}`);
    }
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

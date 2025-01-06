import { api } from '@api/index';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { UserLogin, UserLoginRes } from 'src/types';

const login = async (loginData: UserLogin): Promise<UserLoginRes> => {
  return await api.users.loginUser(loginData);
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('role', data.role);
      navigate('/dashboard');
    },
    onError: (error) => {
      throw error;
    }
  });
};

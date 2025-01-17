import { apiClient } from '@src/api';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading } from '@src/components';
import { useTokenContext } from '@src/hooks/useTokenContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type TokenAuthProps = {
  element: JSX.Element;
};

export const TokenAuth = ({ element }: TokenAuthProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const { setTokenData } = useTokenContext();
  const navigate = useNavigate();

  const { isLoading } = useQuery(['validToken', token], () => apiClient.users.valid(token), {
    retry: false,
    onError: () => {
      localStorage.clear();
      navigate(Routes.Login);
      return;
    },
    onSuccess: (data) => {
      setTokenData(data);
    }
  });

  if (isLoading) return <Loading />;

  return element;
};

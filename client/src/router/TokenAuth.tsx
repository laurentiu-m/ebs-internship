import { useEffect } from 'react';

import { apiClient } from '@src/api';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type TokenAuthProps = {
  element: JSX.Element;
};

export const TokenAuth = ({ element }: TokenAuthProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  const { setTokenData } = useAppContext();
  const navigate = useNavigate();

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ['validToken', token],
    queryFn: () => apiClient.users.valid(token),
    retry: false
  });

  useEffect(() => {
    if (isError) {
      localStorage.clear();
      navigate(Routes.Login);
    }

    if (isSuccess) {
      setTokenData(data);
    }
  }, [isError, isSuccess, navigate, data, setTokenData]);

  if (isLoading) return <Loading />;

  return element;
};

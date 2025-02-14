import { useEffect } from 'react';

import { apiClient } from '@src/api';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
type TokenAuthProps = {
  element: JSX.Element;
};

export const TokenAuth = ({ element }: TokenAuthProps) => {
  const { t } = useTranslation();
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

      toast.error(t('notification.session'));

      navigate(Routes.Login);
    }

    if (isSuccess) {
      setTokenData(data);
    }
  }, [isError, isSuccess, navigate, data, setTokenData, t]);

  if (isLoading) return <Loading />;

  return element;
};

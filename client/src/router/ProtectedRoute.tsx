import { validUser } from '@api';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@components/Loading';
import { ACCESS_TOKEN, USER_ROLE, Routes } from '@types';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  const { isLoading, isError } = useQuery(['userToken', token], () => validUser(token), {
    retry: false,
    onError: () => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_ROLE);
      navigate(Routes.Login);
      return;
    }
  });

  if (isLoading) return <Loading />;

  if (!isError) {
    return children;
  }
};

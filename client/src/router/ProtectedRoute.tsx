import { api } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'src/components/Loading';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
  });

  const { isLoading, isError } = useQuery(['validUser', token], () => api.users.validUser(token), {
    retry: false,
    onError: () => {
      navigate('/login');
    }
  });

  if (isLoading) return <Loading />;

  if (!isError) {
    return children;
  }
};

import { api } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'src/components/Loading';

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const { isLoading } = useQuery(['validUser', token], () => api.users.validUser(token), {
    retry: false,
    onError: () => {
      navigate('/login');
    }
  });

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

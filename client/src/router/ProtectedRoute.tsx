import { api } from '@api/index';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from 'src/components/Loading';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole: string;
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (requiredRole !== userRole) {
      if (userRole === 'user') {
        navigate('/dashboard');
        return;
      }

      navigate(`/dashboard-${userRole}`);
      return;
    }
  });

  const { isLoading, isError } = useQuery(['userToken', token], () => api.users.validUser(token), {
    retry: false,
    onError: () => {
      navigate('/login');
    }
  });

  if (isLoading) return <Loading />;

  if (!isError && requiredRole === userRole) {
    return children;
  }
};

import { validUser } from '@api/users';
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

  const { isLoading, isError } = useQuery(['userToken', token], () => validUser(token), {
    retry: false,
    onError: (error) => {
      navigate('/error', { state: { errorMessage: error, buttonMessage: 'Login', navigate: '/login' } });
    }
  });

  useEffect(() => {
    if (!token) {
      navigate('/error', {
        state: {
          errorMessage: 'Token is invalid or expired. Please log in again.',
          buttonMessage: 'Login',
          navigate: '/login'
        }
      });
      return;
    }

    if (requiredRole !== userRole) {
      navigate('/unauthorized');
      return;
    }
  });

  if (isLoading) return <Loading />;

  if (!isError && requiredRole === userRole) {
    return children;
  }
};

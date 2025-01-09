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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      navigate('/error', { state: { errorMessage: error, buttonMessage: 'Login', navigate: '/login' } });
      return;
    }
  });

  useEffect(() => {
    if (!token) {
      navigate('/error', {
        state: {
          errorMessage: 'Token is invalid or expired. Please login again.',
          buttonMessage: 'Login',
          navigate: '/login'
        }
      });
      return;
    }

    if (requiredRole !== userRole) {
      navigate('/error', {
        state: {
          errorMessage: 'You are not authorized to enter this page.',
          buttonMessage: 'Return Home',
          navigate: '/login'
        }
      });
      return;
    }
  }, []);

  if (isLoading) return <Loading />;

  if (!isError && requiredRole === userRole) {
    return children;
  }
};

import { validUser } from '@api';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@components/Loading';
import { ACCESS_TOKEN, USER_ROLE, Routes } from '@types';

type ProtectedRouteProps = {
  children: ReactNode;
  requiredRole: string;
};

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const userRole = localStorage.getItem(USER_ROLE);
  const navigate = useNavigate();

  const { isLoading, isError } = useQuery(['userToken', token], () => validUser(token), {
    retry: false,
    onError: (error) => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(USER_ROLE);
      navigate(Routes.Error, { state: { errorMessage: error, buttonMessage: 'Login', navigate: Routes.Login } });
      return;
    }
  });

  useEffect(() => {
    if (!token) {
      navigate(Routes.Error, {
        state: {
          errorMessage: 'Token is invalid or expired. Please login again.',
          buttonMessage: 'Login',
          navigate: Routes.Login
        }
      });
      return;
    }

    if (requiredRole !== userRole) {
      navigate(Routes.Error, {
        state: {
          errorMessage: 'You are not authorized to enter this page.',
          buttonMessage: 'Return Home',
          navigate: Routes.Login
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

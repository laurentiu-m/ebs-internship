import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { ACCESS_TOKEN, Routes } from '@src/types';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  element: JSX.Element;
  requiredRoles: string[];
};

export const ProtectedRoute = ({ element, requiredRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery(['validToken', token], () => apiClient.users.valid(token), {
    retry: false,
    onError: () => {
      localStorage.removeItem(ACCESS_TOKEN);
      navigate(Routes.Login);
      return;
    }
  });

  if (isLoading) return <Loading />;

  const userRole = data?.decodedToken.role;

  if (!requiredRoles.includes(userRole)) {
    return <div>403 - You don't have access to this page</div>;
  }

  if (!isError) {
    return element;
  }
};

import { apiClient } from '@src/api';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  element: JSX.Element;
  requiredRoles: string[];
};

export const ProtectedRoute = ({ element, requiredRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['validToken', token], () => apiClient.users.valid(token), {
    retry: false,
    onError: () => {
      localStorage.removeItem(ACCESS_TOKEN);
      navigate(Routes.Login);
      return;
    }
  });

  if (isLoading) return <Loading />;

  const userRole = data?.role;

  if (!userRole || !requiredRoles.includes(userRole)) {
    return <div>403 - You don't have access to this page</div>;
  }

  return element;
};

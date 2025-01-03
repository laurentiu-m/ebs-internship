import { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  role: string;
};

export const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || userRole !== role) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return children;
};

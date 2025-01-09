import { Roles, USER_ROLE } from '@types';
import { AdminDashboard } from './AdminDashboard';
import { ModeratorDashboard } from './ModeratorDashboard';
import { UserDashboard } from './UserDashboard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Dashboard = () => {
  const userRole = localStorage.getItem(USER_ROLE);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole) {
      navigate('/login');
    }
  }, []);

  switch (userRole) {
    case Roles.Admin:
      return <AdminDashboard />;
    case Roles.Moderator:
      return <ModeratorDashboard />;
    case Roles.User:
      return <UserDashboard />;
    default:
      return;
  }
};

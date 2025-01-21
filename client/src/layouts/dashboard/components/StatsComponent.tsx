import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';

import { StatItem } from './StatItem';

const statsConfig = [
  {
    title: 'Total Users',
    queryKey: ['total_users'],
    fetchFunction: () => apiClient.users.getTotalUsers(),
    requiredRoles: [Roles.Admin]
  },
  {
    title: 'Total Admins',
    queryKey: ['total_admins'],
    fetchFunction: () => apiClient.users.getAdminCount(),
    requiredRoles: [Roles.Admin]
  },
  {
    title: 'Total Moderators',
    queryKey: ['total_moderators'],
    fetchFunction: () => apiClient.users.getModeratorCount(),
    requiredRoles: [Roles.Admin]
  },
  {
    title: 'Total of Regular Users',
    queryKey: ['total_user'],
    fetchFunction: () => apiClient.users.getUserCount(),
    requiredRoles: [Roles.Admin]
  },
  {
    title: 'Total Posts',
    queryKey: ['total_posts'],
    fetchFunction: () => apiClient.posts.getTotalPosts(),
    requiredRoles: [Roles.Admin]
  }
];

export const StatsComponent = () => {
  const { tokenData } = useAppContext();

  if (!tokenData) {
    return <Loading />;
  }

  const { role } = tokenData;

  return (
    <div className="dashboard__stats">
      {statsConfig
        .filter((stats) => stats.requiredRoles.includes(role as Roles))
        .map((stats) => (
          <StatItem
            key={stats.title}
            title={stats.title}
            queryKey={stats.queryKey}
            fetchFunction={stats.fetchFunction}
          />
        ))}
    </div>
  );
};

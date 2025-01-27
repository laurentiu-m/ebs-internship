import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';

import { BarChartComponent } from './BarChartComponent';
import { PieChartComponent } from './PieChartComponent';

const barChartsConfig = [
  {
    title: 'Users with the Most Posts',
    queryKey: 'top_users',
    axisKey: { yKey: 'postCount', xKey: 'userId' },
    tooltip: { xKey: 'UserId', yKey: 'Posts' },
    fetchFunction: () => apiClient.users.getTopUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  {
    title: 'Most Commented Posts',
    queryKey: 'top_posts',
    axisKey: { yKey: 'commentCount', xKey: 'postId' },
    tooltip: { xKey: 'PostId', yKey: 'Comments' },
    fetchFunction: () => apiClient.posts.getTopPosts(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  }
];

const pieChartsConfig = [
  {
    title: 'Gender Distribution of Users',
    queryKey: 'gender_number',
    fetchFunction: () => apiClient.users.getGenderCount(),
    colors: ['#0088FE', '#00C49F', '#FFBB28'],
    requiredRoles: [Roles.Admin]
  },
  {
    title: 'Roles Distribution of Users',
    queryKey: 'roles_number',
    fetchFunction: () => apiClient.users.getRolesCount(),
    colors: ['#0088FE', '#00C49F', '#FFBB28'],
    requiredRoles: [Roles.Admin]
  }
];

export const ChartsComponent = () => {
  const { tokenData } = useAppContext();

  if (!tokenData) return <Loading />;

  const { role } = tokenData;

  return (
    <div className="dashboard__charts">
      {barChartsConfig
        .filter(({ requiredRoles }) => requiredRoles.includes(role as Roles))
        .map(({ title, queryKey, axisKey, fetchFunction, tooltip }) => (
          <BarChartComponent
            key={queryKey}
            title={title}
            queryKey={queryKey}
            axisKey={axisKey}
            tooltip={tooltip}
            fetchFunction={fetchFunction}
          />
        ))}

      {pieChartsConfig
        .filter(({ requiredRoles }) => requiredRoles.includes(role as Roles))
        .map(({ title, queryKey, fetchFunction, colors }) => (
          <PieChartComponent
            key={queryKey}
            title={title}
            queryKey={queryKey}
            fetchFunction={fetchFunction}
            colors={colors}
          />
        ))}
    </div>
  );
};

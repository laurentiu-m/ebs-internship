import { apiClient } from '@src/api';
import { Roles } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';

import { BarChartComponent } from './BarChartComponent';

const barChartsConfig = [
  {
    queryKey: 'top_users',
    axisKey: { yKey: 'postCount', xKey: 'userId' },
    tooltip: { xKey: 'User ID:', yKey: 'posts' },
    fetchFunction: () => apiClient.users.getTopUsers(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  },
  {
    queryKey: 'top_posts',
    axisKey: { yKey: 'commentCount', xKey: 'postId' },
    tooltip: { xKey: 'Post ID:', yKey: 'comments' },
    fetchFunction: () => apiClient.posts.getTopPosts(),
    requiredRoles: [Roles.Admin, Roles.Moderator]
  }
];

export const ChartsComponent = () => {
  const { tokenData } = useAppContext();

  if (!tokenData) return <Loading />;

  const { role } = tokenData;

  return (
    <div className="charts">
      {barChartsConfig
        .filter(({ requiredRoles }) => requiredRoles.includes(role as Roles))
        .map(({ queryKey, axisKey, fetchFunction, tooltip }) => (
          <BarChartComponent
            key={queryKey}
            queryKey={queryKey}
            axisKey={axisKey}
            tooltip={tooltip}
            fetchFunction={fetchFunction}
          />
        ))}
    </div>
  );
};

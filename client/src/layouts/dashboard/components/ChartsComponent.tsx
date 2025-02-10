import { Roles } from '@src/app-constants';
import { Loading } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';

import { BarChartComponent, PieChartComponent, StatItem } from './';
import { configBar, configPie, configStats } from '../configs/';

export const ChartsComponent = () => {
  const { tokenData } = useAppContext();

  if (!tokenData) return <Loading />;

  const userRole = tokenData.role;
  const userId = tokenData.userId;

  const { userPost, postCommented, userPostCommented } = configBar;
  const { gender, role } = configPie;
  const { totalUsers, totalPosts, totalComments, totalUserPosts, totalUserComments, totalAlbums } = configStats;

  const middleStats = [totalUsers, totalPosts, totalComments];
  const userStats = [totalUserPosts, totalUserComments, totalAlbums];

  return (
    <div className="dashboard__charts">
      {/* Top Charts */}
      {userRole !== Roles.User && (
        <div className="charts-top">
          {role.requiredRoles.includes(userRole as Roles) && (
            <PieChartComponent key={role.queryKey} queryKey={role.queryKey} fetchFunction={role.fetchFunction} />
          )}
          {userPost.requiredRoles.includes(userRole as Roles) && (
            <BarChartComponent
              key={userPost.queryKey}
              queryKey={userPost.queryKey}
              axisKey={userPost.axisKey}
              tooltip={userPost.tooltip}
              fetchFunction={userPost.fetchFunction}
            />
          )}
        </div>
      )}

      {/* Middle Charts */}
      {userRole !== Roles.User && (
        <div className="charts-middle">
          <div className="wrapper">
            <div className="stats">
              {middleStats
                .filter((stat) => stat.requiredRoles.includes(userRole as Roles))
                .map((stat) => (
                  <StatItem
                    key={stat.queryKey}
                    queryKey={stat.queryKey}
                    fetchFunction={stat.fetchFunction}
                    icon={stat.icon}
                  />
                ))}
            </div>

            {userPost.requiredRoles.includes(userRole as Roles) && (
              <BarChartComponent
                key={postCommented.queryKey}
                queryKey={postCommented.queryKey}
                axisKey={postCommented.axisKey}
                tooltip={postCommented.tooltip}
                fetchFunction={postCommented.fetchFunction}
              />
            )}
          </div>

          {role.requiredRoles.includes(userRole as Roles) && (
            <PieChartComponent key={gender.queryKey} queryKey={gender.queryKey} fetchFunction={gender.fetchFunction} />
          )}
        </div>
      )}

      {/* Bottom Charts */}
      <div className="chart-bottom">
        <div className="stats">
          {userStats
            .filter((stat) => stat.requiredRoles.includes(userRole as Roles))
            .map((stat) => (
              <StatItem
                key={stat.queryKey}
                queryKey={stat.queryKey}
                fetchFunction={() => stat.fetchFunction(userId)}
                icon={stat.icon}
              />
            ))}
        </div>

        {userPostCommented.requiredRoles.includes(userRole as Roles) && (
          <BarChartComponent
            key={userPostCommented.queryKey}
            queryKey={userPostCommented.queryKey}
            axisKey={userPostCommented.axisKey}
            tooltip={userPostCommented.tooltip}
            fetchFunction={() => userPostCommented.fetchFunction(userId)}
          />
        )}
      </div>
    </div>
  );
};

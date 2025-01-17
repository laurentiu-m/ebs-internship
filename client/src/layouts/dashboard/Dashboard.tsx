import { Roles } from '@src/app-constants';
import { Loading } from '@src/components';
import { useTokenContext } from '@src/hooks/useTokenContext';

export const Dashboard = () => {
  const { tokenData } = useTokenContext();

  if (!tokenData) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Dashboard</h1>

      {Roles.Admin === tokenData.role && <h1>Welcome back, admin</h1>}
      {Roles.Moderator === tokenData.role && <h1>Welcome back, moderator</h1>}
      {Roles.User === tokenData.role && <h1>Welcome back, user</h1>}
    </div>
  );
};

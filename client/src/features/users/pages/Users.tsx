import { UserTable } from '../components/UserTable';
import '../index.scss';

export const Users = () => {
  return (
    <div className="users">
      <h1 className="users__header">Users</h1>

      <UserTable />
    </div>
  );
};

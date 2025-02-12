import { UserForm } from '../components';
import '../index.scss';

export const UsersCreate = () => {
  return (
    <div className="users-create">
      <UserForm mainClass="users-create" submitButton="form.button.create" />
    </div>
  );
};

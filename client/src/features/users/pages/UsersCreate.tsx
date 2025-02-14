import { UserForm } from '../components';
import '../index.scss';

export const UsersCreate = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="users-create">
      <UserForm mainClass="users-create" submitButton="form.button.create" onClose={onClose} />
    </div>
  );
};

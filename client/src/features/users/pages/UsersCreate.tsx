import { UserForm } from '../components';
import { createUser } from '../utils/userUtils';
import '../index.scss';

export const UsersCreate = () => {
  return (
    <div className="users-create">
      <UserForm
        mainClass="users-create"
        header="users.title-create"
        submitButton="form.button.create"
        submitFunction={createUser}
      />
    </div>
  );
};

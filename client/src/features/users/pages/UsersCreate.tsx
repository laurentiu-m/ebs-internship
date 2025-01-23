import { UserForm } from '@src/components/UserForm';

import { createUser } from '../utils/userUtils';
import '../index.scss';

export const UsersCreate = () => {
  return (
    <div className="users-create">
      <UserForm
        mainClass="users-create"
        header={{ title: 'Create User', description: '' }}
        submitButton="Create"
        submitFunction={createUser}
        showRedirect={false}
      />
    </div>
  );
};

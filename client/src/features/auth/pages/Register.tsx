import { UserForm } from '@src/components/UserForm';

import { registerSubmit } from '../utils/authUtils';

export const Register = () => {
  return (
    <UserForm
      mainClass="auth"
      header={{ title: 'register.heading', description: 'register.description' }}
      submitButton="register.form.submit"
      submitFunction={registerSubmit}
      showRedirect={true}
    />
  );
};

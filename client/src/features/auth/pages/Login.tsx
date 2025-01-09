import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSubmit } from '@auth-utils/authUtils';
import { FormInput } from '@auth-components/FormInput';
import { Errors } from '@auth-components/Errors';
import { Loading } from '@components/Loading';
import { ACCESS_TOKEN, USER_ROLE } from '@types';
import '@styles/index.scss';

const loginSchema = z.object({
  email: z.string().nonempty('Please add your email').email('Invalid email'),
  password: z.string().nonempty('Please add your password')
});

type FormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem(ACCESS_TOKEN);
  const role = localStorage.getItem(USER_ROLE);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (role === 'user') {
        navigate('/dashboard');
        return;
      }
      navigate(`/dashboard-${role}`);
      return;
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <Loading />;

  const onSubmit = async (data: FormData) => {
    await loginSubmit(data, setError, navigate);
  };

  const allErrors = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="auth">
      <h1 className="auth__header">Login</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormInput name="email" type="email" register={register} placeholder="Email" error={errors.email} />
        <FormInput name="password" type="password" register={register} placeholder="Password" error={errors.password} />

        <input disabled={isSubmitting} className="form__submit" type="submit" value="Login" />

        <Link to="/register" className="form__redirect">
          Register
        </Link>
      </form>
      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { loginSubmit, fetchToken } from '../utils/authUtils';
import { FormInput } from '../components/FormInput';
import { Errors } from '../components/Errors';
import { useLogin } from '../hooks/useLogin';
import '../index.scss';

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
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();

  const { data: token, isLoading } = useQuery(['accessToken'], fetchToken);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const loginMutation = useLogin();

  const onSubmit = async (data: FormData) => {
    loginSubmit(data, loginMutation, reset, setError);
  };

  if (isLoading) return <div>Loading...</div>;

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

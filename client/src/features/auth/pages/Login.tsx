import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import '../index.scss';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../api';
import { AxiosError } from 'axios';

const loginSchema = z.object({
  email: z.string().nonempty('Please add your email').email('Invalid email'),
  password: z.string().nonempty('Please add your password')
});

type FormData = z.infer<typeof loginSchema>;

export const Login = () => {
  const [error, setError] = useState({ message: '', active: false });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: FormData) => {
    try {
      await api.users.loginUser(data);
      setError({ message: '', active: false });
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Failed to login: ', err.response?.data.message);
        setError({ message: err.response?.data.message, active: true });
      } else {
        console.error('Something went wrong: ', err);
        setError({ message: 'Something went wrong', active: true });
      }
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__header">Login</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <input {...register('email')} type="email" className="form__input" placeholder="Email" />
        {errors.email && <p className="form__error">{`${errors.email.message}`}</p>}
        <input {...register('password')} type="password" className="form__input" placeholder="Password" />
        {errors.password && <p className="form__error">{`${errors.password.message}`}</p>}
        <input disabled={isSubmitting} className="form__submit" type="submit" value="Login" />
        {error.active && <p className="form__error">{error.message}</p>}
        <Link to="/register" className="form__redirect">
          Register
        </Link>
      </form>
    </div>
  );
};

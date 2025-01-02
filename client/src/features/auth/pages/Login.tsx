import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import '../index.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@api/index';
import { AxiosError } from 'axios';

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

  const onSubmit = async (data: FormData) => {
    try {
      await api.users.loginUser(data);
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        setError('email', { type: 'server', message: err.response?.data.message });
        setError('password', { type: 'server', message: '' });
      } else {
        setError('email', { type: 'server', message: 'Something went wrong' });
        setError('password', { type: 'server', message: '' });
      }
    }
  };

  const allErrors = Object.values(errors)
    .map((error) => {
      if (error.type === 'invalid_string' || error.type === 'server') {
        return error.message;
      }
    })
    .filter(Boolean);

  return (
    <div className="auth">
      <h1 className="auth__header">Login</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <input
          {...register('email')}
          type="email"
          className={`form__input ${errors.email && 'form__input--error'}`}
          placeholder={errors.email?.type === 'too_small' ? errors.email.message : 'Email'}
        />
        <input
          {...register('password')}
          type="password"
          className={`form__input ${errors.password && 'form__input--error'}`}
          placeholder={errors.password?.type === 'too_small' ? errors.password.message : 'Password'}
        />
        <input disabled={isSubmitting} className="form__submit" type="submit" value="Login" />

        <Link to="/register" className="form__redirect">
          Register
        </Link>
      </form>
      {allErrors &&
        allErrors.map((error) => (
          <p className="error" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
};

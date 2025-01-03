import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import '../index.scss';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@api/index';
import { AxiosError } from 'axios';
import { FormInput } from '../components/FormInput';
import { Errors } from '../components/Errors';

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

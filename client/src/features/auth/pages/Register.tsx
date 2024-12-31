import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import validator from 'validator';
import '../index.scss';
import { api } from '../../../api/index';
import { useState } from 'react';
import { AxiosError } from 'axios';

const registerSchema = z
  .object({
    firstName: z.string().nonempty('First name is required').min(2, 'First name must be at least 2 characters'),
    lastName: z.string().nonempty('Last name is required').min(2, 'Last name must be at least 2 characters'),
    username: z.string().nonempty('Username is required').min(4, 'Username must be at least 4 characters'),
    email: z.string().nonempty('Please add your email').email('Invalid email address'),
    phone: z.string().nonempty('Please add your phone number').refine(validator.isMobilePhone, 'Invalid phone number'),
    gender: z.string().nonempty('Please select a gender'),
    password: z.string().nonempty('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().nonempty('Confirm password is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const [error, setError] = useState({ message: '', active: false });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, ...rest } = data;
    const registerData = { ...rest, name: `${firstName} ${lastName}` };

    try {
      await api.users.createUser(registerData);

      setError({ message: '', active: false });
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Failed to create a new user: ', err.response?.data.message);
        setError({ message: err.response?.data.message, active: true });
      } else {
        console.error('Something went wrong: ', err);
        setError({ message: 'Something went wrong', active: true });
      }
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__header">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <input {...register('firstName')} type="text" className="form__input" placeholder="First Name" />
        {errors.firstName && <p className="form__error">{`${errors.firstName.message}`}</p>}
        <input {...register('lastName')} type="text" className="form__input" placeholder="Last Name" />
        {errors.lastName && <p className="form__error">{`${errors.lastName.message}`}</p>}
        <input {...register('email')} type="email" className="form__input" placeholder="Email" />
        {errors.email && <p className="form__error">{`${errors.email.message}`}</p>}
        <input {...register('username')} type="text" className="form__input" placeholder="Username" />
        {errors.username && <p className="form__error">{`${errors.username.message}`}</p>}
        <input {...register('phone')} type="text" className="form__input" placeholder="Phone" />
        {errors.phone && <p className="form__error">{`${errors.phone.message}`}</p>}
        <select {...register('gender')} defaultValue="" className="form__select">
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefer not to say">Prefer Not to Say</option>
        </select>
        {errors.gender && <p className="form__error">{`${errors.gender.message}`}</p>}
        <input {...register('password')} type="password" className="form__input" placeholder="Password" />
        {errors.password && <p className="form__error">{`${errors.password.message}`}</p>}
        <input
          {...register('confirmPassword')}
          type="password"
          className="form__input"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p className="form__error">{`${errors.confirmPassword.message}`}</p>}
        {error.active && <p className="form__error">{error.message}</p>}
        <input disabled={isSubmitting} type="submit" className="form__submit" value="Register" />
        <Link to="/login" className="form__redirect">
          Login
        </Link>
      </form>
    </div>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import validator from 'validator';
import '../index.scss';
import { api } from '../../../api/index';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    username: z.string().min(4, 'Username is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().refine(validator.isMobilePhone),
    gender: z.string().nonempty('Please select a gender'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword']
  });

type FormData = z.infer<typeof registerSchema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      ...data,
      name: `${data.firstName} ${data.lastName}`
    };
    const { firstName, lastName, ...dataToSend } = formattedData;

    try {
      await api.users.createUser(dataToSend);
      reset();
    } catch (error) {
      console.log('Failed to create user', error);
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
        <input disabled={isSubmitting} type="submit" className="form__submit" value="Register" />
        <Link to="/login" className="form__redirect">
          Login
        </Link>
      </form>
    </div>
  );
};

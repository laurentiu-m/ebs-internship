import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import '../index.scss';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    selectedGender: z.string().nonempty('Please select a gender'),
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

  const onSubmit = (data: FormData) => {
    reset();
  };

  return (
    <div className="auth">
      <h1 className="auth__header">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input {...register('firstName')} type="text" className="form__input" placeholder="First Name" />
        {errors.firstName && <p className="form__error">{`${errors.firstName.message}`}</p>}
        <input {...register('lastName')} type="text" className="form__input" placeholder="Last Name" />
        {errors.lastName && <p className="form__error">{`${errors.lastName.message}`}</p>}
        <input {...register('email')} type="email" className="form__input" placeholder="Email" />
        {errors.email && <p className="form__error">{`${errors.email.message}`}</p>}
        <select {...register('selectedGender')} defaultValue="" className="form__select">
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">Prefer Not to Say</option>
        </select>
        {errors.selectedGender && <p className="form__error">{`${errors.selectedGender.message}`}</p>}
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

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import validator from 'validator';
import '../index.scss';
import { api } from '../../../api/index';
import { AxiosError } from 'axios';
import { FormInput } from '../components/FormInput';
import { Select } from '../components/Select';
import { Errors } from '../components/Errors';

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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const genderOptions = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
    { value: 'prefer not to say', text: 'Prefer Not to Say' }
  ];

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, ...rest } = data;
    const registerData = { ...rest, name: `${firstName} ${lastName}` };

    try {
      await api.users.createUser(registerData);
      reset();
    } catch (err) {
      if (err instanceof AxiosError) {
        const errData = err.response?.data;

        if (errData.error === 'form_invalid') {
          errData.fields.map((error: { field: keyof FormData; message: string }) => {
            setError(error.field, { type: 'server', message: error.message });
          });
          return;
        }

        setError(errData.field, { type: errData.type, message: errData.message });
      }
    }
  };

  const allErrors = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="auth">
      <h1 className="auth__header">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput name="firstName" type="text" register={register} placeholder="First Name" error={errors.firstName} />
        <FormInput name="lastName" type="text" register={register} placeholder="Last Name" error={errors.lastName} />
        <FormInput name="email" type="email" register={register} placeholder="Email" error={errors.email} />
        <FormInput name="username" type="text" register={register} placeholder="Username" error={errors.username} />
        <FormInput name="phone" type="text" register={register} placeholder="Phone" error={errors.phone} />
        <Select
          register={register}
          name="gender"
          description="Select Gender"
          options={genderOptions}
          error={errors.gender}
        />
        <FormInput name="password" type="password" register={register} placeholder="Password" error={errors.password} />
        <FormInput
          name="confirmPassword"
          type="password"
          register={register}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />

        <input disabled={isSubmitting} type="submit" className="form__submit" value="Register" />
        <Link to="/login" className="form__redirect">
          Login
        </Link>
      </form>

      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

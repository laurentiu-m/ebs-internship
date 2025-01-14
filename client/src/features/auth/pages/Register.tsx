import { zodResolver } from '@hookform/resolvers/zod';
import { LanguageSelector } from '@src/components';
import { UserRegister } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { z } from 'zod';

import { FormInput, Select, Errors } from '../components';
import { registerSubmit } from '../utils/authUtils';

import '../index.scss';

export const Register = () => {
  const { t } = useTranslation();
  const registerSchema = z
    .object({
      firstName: z.string().nonempty(t('register.error.first_name_empty')).min(2, t('register.error.first_name_min')),
      lastName: z.string().nonempty(t('register.error.last_name_empty')).min(2, t('register.error.last_name_min')),
      username: z.string().nonempty(t('register.error.username_empty')).min(4, t('register.error.username_min')),
      email: z.string().nonempty(t('register.error.email_empty')).email(t('register.error.email_invalid')),
      phone: z
        .string()
        .nonempty(t('register.error.phone_empty'))
        .refine(validator.isMobilePhone, t('register.error.phone_invalid')),
      gender: z.string().nonempty(t('register.error.gender_empty')),
      password: z.string().nonempty(t('register.error.password_empty')).min(8, t('register.error.password_min')),
      confirmPassword: z.string().nonempty(t('register.error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('register.error.confirm_password_invalid'),
      path: ['confirmPassword']
    });

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const genderOptions = [
    { value: 'male', text: t('register.form.gender.male') },
    { value: 'female', text: t('register.form.gender.female') },
    { value: 'prefer_not_to_say', text: t('register.form.gender.prefer_not_to_say') }
  ];

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, confirmPassword, ...rest } = data;
    const registerData: UserRegister = {
      ...rest,
      name: `${firstName} ${lastName}`
    };

    registerSubmit(registerData, setError, navigate);
  };

  const allErrors = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="auth">
      <div className="language">
        <LanguageSelector />
      </div>

      <div className="auth__header">
        <h1>{t('register.heading')}</h1>
        <p>{t('register.description')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput
          name="firstName"
          type="text"
          register={register}
          placeholder={t('register.form.first_name')}
          error={errors.firstName}
        />
        <FormInput
          name="lastName"
          type="text"
          register={register}
          placeholder={t('register.form.last_name')}
          error={errors.lastName}
        />
        <FormInput
          name="email"
          type="email"
          register={register}
          placeholder={t('register.form.email')}
          error={errors.email}
        />
        <FormInput
          name="username"
          type="text"
          register={register}
          placeholder={t('register.form.username')}
          error={errors.username}
        />
        <FormInput
          name="phone"
          type="text"
          register={register}
          placeholder={t('register.form.phone')}
          error={errors.phone}
        />
        <Select
          register={register}
          name="gender"
          description={t('register.form.gender.default')}
          options={genderOptions}
          error={errors.gender}
        />
        <FormInput
          name="password"
          type="password"
          register={register}
          placeholder={t('register.form.password')}
          error={errors.password}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          register={register}
          placeholder={t('register.form.confirm_password')}
          error={errors.confirmPassword}
        />

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t('register.form.submit')} />
        <Link to="/login" className="form__redirect">
          {t('register.form.login')}
        </Link>
      </form>

      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

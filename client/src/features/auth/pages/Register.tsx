import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormSelect } from '@src/components';
import { UserRegister } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { z } from 'zod';

import { registerSubmit } from '../utils/authUtils';

import '../index.scss';

export const Register = () => {
  const { t } = useTranslation();
  const registerSchema = z
    .object({
      first_name: z.string().nonempty(t('register.error.first_name_empty')).min(2, t('register.error.first_name_min')),
      last_name: z.string().nonempty(t('register.error.last_name_empty')).min(2, t('register.error.last_name_min')),
      username: z.string().nonempty(t('register.error.username_empty')).min(4, t('register.error.username_min')),
      email: z.string().nonempty(t('register.error.email_empty')).email(t('register.error.email_invalid')),
      phone: z
        .string()
        .nonempty(t('register.error.phone_empty'))
        .refine(validator.isMobilePhone, t('register.error.phone_invalid')),
      gender: z.string().nonempty(),
      password: z.string().nonempty(t('register.error.password_empty')).min(8, t('register.error.password_min')),
      confirm_password: z.string().nonempty(t('register.error.confirm_password_empty'))
    })
    .refine((data) => data.password === data.confirm_password, {
      message: t('register.error.confirm_password_invalid'),
      path: ['confirm_password']
    });

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();

  const genderOptions = [
    { value: 'male', label: t('register.form.gender.male') },
    { value: 'female', label: t('register.form.gender.female') },
    { value: 'prefer_not_to_say', label: t('register.form.gender.prefer_not_to_say') }
  ];

  const onSubmit = async (data: FormData) => {
    const { first_name, last_name, confirm_password, ...rest } = data;
    const registerData: UserRegister = {
      ...rest,
      name: `${first_name} ${last_name}`
    };

    registerSubmit(registerData, setError, navigate);
  };

  return (
    <>
      <div className="auth__header">
        <h1>{t('register.heading')}</h1>
        <p>{t('register.description')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput
          name="first_name"
          type="text"
          label={t('register.form.first_name')}
          register={register}
          placeholder={t('register.form.first_name')}
          error={errors.first_name}
        />
        <FormInput
          name="last_name"
          type="text"
          label={t('register.form.last_name')}
          register={register}
          placeholder={t('register.form.last_name')}
          error={errors.last_name}
        />
        <FormInput
          name="email"
          context="register"
          type="email"
          label={t('register.form.email')}
          register={register}
          placeholder={t('register.form.email')}
          error={errors.email}
        />
        <FormInput
          name="username"
          context="register"
          type="text"
          label={t('register.form.username')}
          register={register}
          placeholder={t('register.form.username')}
          error={errors.username}
        />
        <FormInput
          name="phone"
          type="text"
          label={t('register.form.phone')}
          register={register}
          placeholder={t('register.form.phone')}
          error={errors.phone}
        />
        <FormSelect
          context="register"
          name="gender"
          label={t('register.form.gender.label')}
          placeholder={t('register.form.gender.default')}
          control={control}
          options={genderOptions}
          error={errors.gender}
        />
        <FormInput
          name="password"
          type="password"
          label={t('register.form.password')}
          register={register}
          placeholder={t('register.form.password')}
          error={errors.password}
        />
        <FormInput
          name="confirm_password"
          type="password"
          label={t('register.form.confirm_password')}
          register={register}
          placeholder={t('register.form.confirm_password')}
          error={errors.confirm_password}
        />

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t('register.form.submit')} />
        <div className="form__redirect">
          {t('register.form.redirect.title')} <Link to="/login">{t('register.form.redirect.link')}</Link>
        </div>
      </form>
    </>
  );
};

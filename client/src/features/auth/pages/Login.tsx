import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading } from '@src/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Errors } from '../components';
import { FormInput } from '../components';
import { LanguageSelector } from '../components';
import { loginSubmit } from '../utils/authUtils';

import '../index.scss';

export const Login = () => {
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.string().nonempty(t('login.error.email_empty')).email(t('login.error.email_invalid')),
    password: z.string().nonempty(t('login.error.password_empty'))
  });

  type FormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(loginSchema) });
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(Routes.Dashboard);
    }
    setIsLoading(false);
  }, [token, navigate]);

  if (isLoading) return <Loading />;

  const onSubmit = async (data: FormData) => {
    await loginSubmit(data, setError, navigate);
  };

  const allErrors = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="auth">
      <LanguageSelector />
      <h1 className="auth__header">{t('login.heading')}</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormInput
          name="email"
          type="email"
          register={register}
          placeholder={t('login.form.email')}
          error={errors.email}
        />
        <FormInput
          name="password"
          type="password"
          register={register}
          placeholder={t('login.form.password')}
          error={errors.password}
        />

        <input disabled={isSubmitting} className="form__submit" type="submit" value={t('login.form.submit')} />

        <Link to="/register" className="form__redirect">
          {t('login.form.register')}
        </Link>
      </form>
      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

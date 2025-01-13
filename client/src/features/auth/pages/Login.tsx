import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from '@src/components';
import { ACCESS_TOKEN, Routes } from '@src/types';
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
    email: z.string().nonempty(t('Login.error.email-empty')).email(t('Login.error.email-invalid')),
    password: z.string().nonempty(t('Login.error.password-empty'))
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
      <h1 className="auth__header">{t('Login.heading')}</h1>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormInput
          name="email"
          type="email"
          register={register}
          placeholder={t('Login.form.email')}
          error={errors.email}
        />
        <FormInput
          name="password"
          type="password"
          register={register}
          placeholder={t('Login.form.password')}
          error={errors.password}
        />

        <input disabled={isSubmitting} className="form__submit" type="submit" value={t('Login.form.submit')} />

        <Link to="/register" className="form__redirect">
          {t('Login.form.register')}
        </Link>
      </form>
      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

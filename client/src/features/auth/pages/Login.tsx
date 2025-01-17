import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading, FormInput } from '@src/components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { loginSubmit } from '../utils/authUtils';

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

  return (
    <>
      <div className="auth__header">
        <h1>{t('login.heading')}</h1>
        <p>{t('login.description')}</p>
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormInput
          context="login"
          name="email"
          type="email"
          label={t('login.form.email.label')}
          register={register}
          placeholder={t('login.form.email.placeholder')}
          error={errors.email}
        />
        <FormInput
          context="login"
          name="password"
          type="password"
          label={t('login.form.password.label')}
          register={register}
          placeholder="********"
          error={errors.password}
        />

        <input disabled={isSubmitting} className="form__submit" type="submit" value={t('login.form.submit')} />

        <div className="form__redirect">
          {t('login.form.redirect.title')} <Link to="/register">{t('login.form.redirect.link')}</Link>
        </div>
      </form>
    </>
  );
};

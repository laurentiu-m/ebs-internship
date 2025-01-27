import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ACCESS_TOKEN, Routes } from '@src/app-constants';
import { Loading, FormInput } from '@src/components';
import { getLoginSchema } from '@src/schemas';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { loginSubmit } from '../utils/authUtils';

export const Login = () => {
  const { t } = useTranslation();

  const schema = getLoginSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({ resolver: zodResolver(schema) });
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
        <h1 className="title">{t('form.login.title')}</h1>
        <p className="description">{t('form.login.description')}</p>
      </div>

      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormInput
          name="email"
          type="email"
          label="Email"
          register={register}
          placeholder={t('form.login.label')}
          error={errors.email}
        />
        <FormInput
          name="password"
          type="password"
          label={t('form.label.password')}
          register={register}
          placeholder="********"
          error={errors.password}
        />

        <input disabled={isSubmitting} className="form__submit" type="submit" value={t('form.login.submit')} />

        <div className="form__redirect">
          {t('form.redirect.title-login')} <Link to="/register">{t('form.register.title')}</Link>
        </div>
      </form>
    </>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Genders } from '@src/app-constants';
import { FormInput, FormSelect, Helmet } from '@src/components';
import { registerSubmit } from '@src/features/auth/utils/authUtils';
import { getRegisterSchema } from '@src/schemas';
import { UserRegister } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

export const Register = () => {
  const { t } = useTranslation();

  const schema = getRegisterSchema(t);
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const navigate = useNavigate();

  const genderOptions = [
    { value: Genders.Male, label: t('form.label.gender.male') },
    { value: Genders.Female, label: t('form.label.gender.female') },
    { value: Genders.PreferNotToSay, label: t('form.label.gender.prefer_not_to_say') }
  ];

  const onSubmit = async (data: FormData) => {
    const { first_name, last_name, confirm_password, ...rest } = data;
    const registerData: UserRegister = {
      ...rest,
      name: `${first_name} ${last_name}`
    };

    await registerSubmit(registerData, setError, navigate);
  };

  return (
    <>
      <Helmet page="register" />
      <div className={`auth__header`}>
        <h1 className="title">{t('form.register.title')}</h1>
        <p className="description">{t('form.register.description')}</p>
      </div>

      <div className="auth__register">
        <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
          <div className="form__wrapper">
            <FormInput
              name="first_name"
              type="text"
              label={t('form.label.first_name')}
              register={register}
              placeholder={t('form.label.first_name')}
              error={errors.first_name}
            />
            <FormInput
              name="last_name"
              type="text"
              label={t('form.label.last_name')}
              register={register}
              placeholder={t('form.label.last_name')}
              error={errors.last_name}
            />
          </div>

          <FormInput
            name="email"
            type="email"
            label="Email"
            register={register}
            placeholder="Email"
            error={errors.email}
          />
          <FormInput
            name="username"
            type="text"
            label={t('form.label.username')}
            register={register}
            placeholder={t('form.label.username')}
            error={errors.username}
          />

          <div className="form__wrapper">
            <FormInput
              name="phone"
              type="text"
              label={t('form.label.phone')}
              register={register}
              placeholder={t('form.label.phone')}
              error={errors.phone}
            />
            <FormSelect
              name="gender"
              label={t('form.label.gender.label')}
              placeholder={t('form.label.gender.default')}
              control={control}
              options={genderOptions}
              error={errors.gender}
            />
          </div>

          <FormInput
            name="password"
            type="password"
            label={t('form.label.password')}
            register={register}
            placeholder={t('form.label.password')}
            error={errors.password}
          />
          <FormInput
            name="confirm_password"
            type="password"
            label={t('form.label.confirm_password')}
            register={register}
            placeholder={t('form.label.confirm_password')}
            error={errors.confirm_password}
          />

          <div className="form__submit">
            <input disabled={isSubmitting} type="submit" className="button" value={t('form.register.submit')} />
            <div className="redirect">
              {t('form.redirect.title-register')} <Link to="/login">{t('form.login.title')}</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Genders } from '@src/app-constants';
import { FormInput, FormSelect } from '@src/components';
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
    { value: Genders.Male, label: t('register.form.gender.male') },
    { value: Genders.Female, label: t('register.form.gender.female') },
    { value: Genders.PreferNotToSay, label: t('register.form.gender.prefer_not_to_say') }
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
      <div className={`auth__header`}>
        <h1 className="title">{t('register.heading')}</h1>
        <p className="description">{t('register.description')}</p>
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

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t(`register.form.submit`)} />

        <div className="form__redirect">
          {t('register.form.redirect.title')} <Link to="/login">{t('register.form.redirect.link')}</Link>
        </div>
      </form>
    </>
  );
};

import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import { registerSubmit } from '@auth-utils/authUtils';
import { FormInput } from '@auth-components/FormInput';
import { Select } from '@auth-components/Select';
import { Errors } from '@auth-components/Errors';
import '../index.scss';

export const Register = () => {
  const { t } = useTranslation();
  const registerSchema = z
    .object({
      firstName: z.string().nonempty(t('Register.error.firstName-empty')).min(2, t('Register.error.firstName-min')),
      lastName: z.string().nonempty(t('Register.error.lastName-empty')).min(2, t('Register.error.lastName-min')),
      username: z.string().nonempty(t('Register.error.username-empty')).min(4, t('Register.error.username-min')),
      email: z.string().nonempty(t('Register.error.email-empty')).email(t('Register.error.email-invalid')),
      phone: z
        .string()
        .nonempty(t('Register.error.phone-empty'))
        .refine(validator.isMobilePhone, t('Register.error.phone-invalid')),
      gender: z.string().nonempty(t('Register.error.gender-empty')),
      language: z.string().nonempty(t('Register.error.language-empty')),
      password: z.string().nonempty(t('Register.error.password-empty')).min(8, t('Register.error.password-min')),
      confirmPassword: z.string().nonempty(t('Register.error.confirmPassword-empty'))
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('Register.error.confirmPassword-empty'),
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
    { value: 'male', text: t('Register.form.gender.male') },
    { value: 'female', text: t('Register.form.gender.female') },
    { value: 'prefer not to say', text: t('Register.form.gender.preferNotToSay') }
  ];

  const languageOptions = [
    { value: 'en', text: t('Register.form.language.english') },
    { value: 'ro', text: t('Register.form.language.romanian') }
  ];

  const onSubmit = async (data: FormData) => {
    registerSubmit(data, setError, navigate);
  };

  const allErrors = Object.values(errors)
    .map((error) => error.message)
    .filter(Boolean);

  return (
    <div className="auth">
      <h1 className="auth__header">{t('Register.heading')}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput
          name="firstName"
          type="text"
          register={register}
          placeholder={t('Register.form.firstName')}
          error={errors.firstName}
        />
        <FormInput
          name="lastName"
          type="text"
          register={register}
          placeholder={t('Register.form.lastName')}
          error={errors.lastName}
        />
        <FormInput
          name="email"
          type="email"
          register={register}
          placeholder={t('Register.form.email')}
          error={errors.email}
        />
        <FormInput
          name="username"
          type="text"
          register={register}
          placeholder={t('Register.form.username')}
          error={errors.username}
        />
        <FormInput
          name="phone"
          type="text"
          register={register}
          placeholder={t('Register.form.phone')}
          error={errors.phone}
        />
        <Select
          register={register}
          name="gender"
          description={t('Register.form.gender.default')}
          options={genderOptions}
          error={errors.gender}
        />
        <Select
          register={register}
          name="language"
          description={t('Register.form.language.default')}
          options={languageOptions}
          error={errors.language}
        />
        <FormInput
          name="password"
          type="password"
          register={register}
          placeholder={t('Register.form.password')}
          error={errors.password}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          register={register}
          placeholder={t('Register.form.confirmPassword')}
          error={errors.confirmPassword}
        />

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t('Register.form.submit')} />
        <Link to="/login" className="form__redirect">
          {t('Register.form.login')}
        </Link>
      </form>

      {allErrors && <Errors allErrors={allErrors} />}
    </div>
  );
};

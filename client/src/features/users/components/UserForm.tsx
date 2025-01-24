import { zodResolver } from '@hookform/resolvers/zod';
import { Genders, Roles } from '@src/app-constants';
import { FormInput, FormSelect } from '@src/components';
import { getUsersSchema } from '@src/schemas/';
import { UserCreate, UserFormSubmit, UserFormTypes } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

type UserFormProps = {
  mainClass: string;
  header: { title: string; description: string };
  submitButton: string;
  submitFunction: UserFormSubmit;
  initialValues?: UserFormTypes;
  userId?: string;
};

export const UserForm = ({ mainClass, header, submitButton, submitFunction, initialValues, userId }: UserFormProps) => {
  const { t } = useTranslation();

  const schema = getUsersSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  const genderOptions = [
    { value: Genders.Male, label: t('register.form.gender.male') },
    { value: Genders.Female, label: t('register.form.gender.female') },
    { value: Genders.PreferNotToSay, label: t('register.form.gender.prefer_not_to_say') }
  ];

  const roleOptions = [
    { value: Roles.Admin, label: 'Admin' },
    { value: Roles.Moderator, label: 'Moderator' },
    { value: Roles.User, label: 'User' }
  ];

  const onSubmit = async (data: FormData) => {
    const { first_name, last_name, confirm_password, ...rest } = data;
    const registerData: UserCreate = {
      ...rest,
      name: `${first_name} ${last_name}`
    };

    if (initialValues) {
      const hasChanged = Object.entries(data).some(
        ([key, value]) => initialValues[key as keyof UserFormTypes] !== value
      );

      if (!hasChanged) return;
    }

    const resetForm = await submitFunction(registerData, setError, userId);
    if (resetForm) reset();
  };

  return (
    <>
      <div className={`${mainClass}__header`}>
        <h1 className="title">{t(header?.title)}</h1>
        <p className="description">{t(header?.description)}</p>
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
          defaultValue={initialValues?.gender}
          error={errors.gender}
        />

        <FormSelect
          context="register"
          name="role"
          label="Select Role"
          placeholder={t('register.form.gender.default')}
          control={control}
          options={roleOptions}
          defaultValue={initialValues?.role}
          error={errors.role}
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

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t(submitButton)} />
      </form>
    </>
  );
};

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Genders, Roles } from '@src/app-constants';
import { CloseIcon } from '@src/assets/icons';
import { FormInput, FormSelect } from '@src/components';
import { getUsersSchema } from '@src/schemas/';
import { UserCreate, UserFormTypes } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useCreateUser, useEditUser } from '../hooks/';

type Props = {
  mainClass: string;
  submitButton: string;
  onClose: () => void;
  initialValues?: UserFormTypes;
  userId?: number;
};

export const UserForm = ({ mainClass, submitButton, initialValues, userId, onClose }: Props) => {
  const { t } = useTranslation();

  const { mutate: createUser } = useCreateUser();
  const { mutate: editUser } = useEditUser();

  const schema = getUsersSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const genderOptions = [
    { value: Genders.Male, label: t('form.label.gender.male') },
    { value: Genders.Female, label: t('form.label.gender.female') },
    { value: Genders.PreferNotToSay, label: t('form.label.gender.prefer_not_to_say') }
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

    return userId
      ? editUser({ data: registerData, userId, setError, onClose })
      : createUser({ data: registerData, setError, onClose });
  };

  const getTitle = () => {
    return userId ? initialValues?.username : t('users.title-create');
  };

  return (
    <>
      <div className={`${mainClass}__header`}>
        <h3 className="title">{getTitle()}</h3>
        <CloseIcon className="icon" onClick={onClose} />
      </div>

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

        <div className="form__wrapper">
          <FormInput
            name="username"
            type="text"
            label={t('form.label.username')}
            register={register}
            placeholder={t('form.label.username')}
            error={errors.username}
          />
          <FormInput
            name="phone"
            type="text"
            label={t('form.label.phone')}
            register={register}
            placeholder={t('form.label.phone')}
            error={errors.phone}
          />
        </div>

        <div className="form__wrapper">
          <FormSelect
            name="gender"
            label={t('form.label.gender.label')}
            placeholder={t('form.label.gender.label')}
            control={control}
            options={genderOptions}
            defaultValue={initialValues?.gender}
            error={errors.gender}
          />

          <FormSelect
            name="role"
            label={t('form.label.roles')}
            placeholder={t('form.label.roles-placeholder')}
            control={control}
            options={roleOptions}
            defaultValue={initialValues?.role}
            error={errors.role}
          />
        </div>

        <div className="form__wrapper">
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
        </div>

        <div className="form__submit">
          <input
            disabled={isSubmitting || !isDirty}
            type="submit"
            className={`button ${!isDirty && 'button--disable'}`}
            value={t(submitButton)}
          />
        </div>
      </form>
    </>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Genders, Roles } from '@src/app-constants';
import { FormInput, FormSelect } from '@src/components';
import { getUsersSchema } from '@src/schemas/';
import { UserCreate, UserFormTypes } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { useCreateUser, useEditUser } from '../hooks/';

type Props = {
  mainClass: string;
  submitButton: string;
  initialValues?: UserFormTypes;
  userId?: string;
};

export const UserForm = ({ mainClass, submitButton, initialValues, userId }: Props) => {
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
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

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

    if (initialValues) {
      const hasChanged = Object.entries(data).some(
        ([key, value]) => initialValues[key as keyof UserFormTypes] !== value
      );

      if (!hasChanged) {
        toast.info("You haven't made any changes.");
        return;
      }
    }

    if (userId) {
      editUser({ userId: userId, data: registerData, setError });
      toast.success('User details updated successfully.');
      return;
    }

    createUser({ data: registerData, setError });
    toast.success('New user was created successfully.');
    reset();
  };

  const onTitle = () => {
    if (userId) {
      return `${t('users.title-edit')} ${userId}`;
    } else {
      return t('users.title-create');
    }
  };

  return (
    <>
      <div className={`${mainClass}__header`}>
        <h1 className="title">{onTitle()}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
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

        <input disabled={isSubmitting} type="submit" className="form__submit" value={t(submitButton)} />
      </form>
    </>
  );
};

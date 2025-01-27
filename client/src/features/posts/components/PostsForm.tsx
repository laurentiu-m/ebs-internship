import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormTextarea } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { getPostsSchema } from '@src/schemas';
import { PostForm, PostFormSubmit } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

type PostsFormProps = {
  mainClass: string;
  header: string;
  initialValues?: PostForm;
  submitFunction: PostFormSubmit;
  postId?: string;
  postUserId?: number;
};

export const PostsForm = ({ mainClass, header, initialValues, submitFunction, postId, postUserId }: PostsFormProps) => {
  const { t } = useTranslation();
  const { tokenData } = useAppContext();

  const schema = getPostsSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,

    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  if (!tokenData) return;
  const currentUserId = tokenData.userId;

  const onSubmit = async (data: FormData) => {
    const postData = { ...data, userId: postUserId ? postUserId : currentUserId };

    if (initialValues) {
      const hasChanged = Object.entries(data).some(([key, value]) => initialValues[key as keyof PostForm] !== value);
      if (!hasChanged) return;
    }

    const resetForm = await submitFunction(postData, postId);

    if (resetForm) reset();
  };

  return (
    <>
      <div className={`${mainClass}__header`}>
        <h1 className="title">{header}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput
          name="title"
          type="text"
          label={t('form.label.title')}
          register={register}
          placeholder={t('form.label.title')}
          error={errors.title}
        />
        <FormTextarea
          name="body"
          label={t('form.label.body')}
          register={register}
          placeholder={t('form.label.body')}
          error={errors.body}
        />
        <input disabled={isSubmitting} type="submit" className="form__submit" value={t('form.button.create')} />
      </form>
    </>
  );
};

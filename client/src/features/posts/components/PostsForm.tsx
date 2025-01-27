import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormTextarea } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { getPostsSchema } from '@src/schemas';
import { PostForm, PostFormSubmit } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

type PostsFormProps = {
  initialValues?: PostForm;
  submitFunction: PostFormSubmit;
};

export const PostsForm = ({ initialValues, submitFunction }: PostsFormProps) => {
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
  const userId = tokenData.userId;

  const onSubmit = async (data: FormData) => {
    const postData = { ...data, userId: userId };

    if (initialValues) {
      const hasChanged = Object.entries(data).some(([key, value]) => initialValues[key as keyof PostForm] !== value);
      if (!hasChanged) return;
    }

    const resetForm = await submitFunction(postData);

    if (resetForm) reset();
  };

  return (
    <>
      <div className="posts-create__header">
        <h1 className="title">Create Post</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form" autoComplete="off">
        <FormInput
          name="title"
          type="text"
          label="Title"
          register={register}
          placeholder="Title of the post"
          error={errors.title}
        />
        <FormTextarea name="body" label="Body" register={register} placeholder="Body of the post" error={errors.body} />
        <input disabled={isSubmitting} type="submit" className="form__submit" value={t('create')} />
      </form>
    </>
  );
};

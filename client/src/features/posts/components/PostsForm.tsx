import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { CloseIcon } from '@src/assets/icons';
import { FormInput, FormTextarea } from '@src/components';
import { useAppContext } from '@src/hooks/useAppContext';
import { getPostsSchema } from '@src/schemas';
import { PostForm } from '@src/types';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import { useCreatePost, useEditPost } from '../hooks';

type Props = {
  mainClass: string;
  initialValues?: PostForm;
  postId?: number;
  postUserId?: number;
};

export const PostsForm = ({ mainClass, initialValues, postId, postUserId }: Props) => {
  const { t } = useTranslation();
  const { tokenData, onCloseModal } = useAppContext();
  const { mutate: createPost } = useCreatePost();
  const { mutate: editPost } = useEditPost();

  const schema = getPostsSchema(t);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  if (!tokenData) return;
  const currentUserId = tokenData.userId;

  const onSubmit = async (data: FormData) => {
    const postData = { ...data, userId: postUserId ? postUserId : currentUserId };

    return postId ? editPost({ data: postData, postId, onCloseModal }) : createPost({ data: postData, onCloseModal });
  };

  const onTitle = () => {
    if (postId) {
      return t('posts.title-edit');
    } else {
      return t('posts.title-create');
    }
  };

  return (
    <>
      <div className={`${mainClass}__header`}>
        <h1 className="title">{onTitle()}</h1>
        <CloseIcon className="icon" onClick={onCloseModal} />
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

        <div className="form__submit form__submit--post">
          <input
            disabled={isSubmitting || !isDirty}
            type="submit"
            className={`button ${!isDirty && 'button--disable'}`}
            value={t('form.button.create')}
          />
        </div>
      </form>
    </>
  );
};

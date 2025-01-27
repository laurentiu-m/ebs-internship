import { useTranslation } from 'react-i18next';

import { PostsForm } from '../components';
import { createPost } from '../utils/postsUtils';

export const PostsCreate = () => {
  const { t } = useTranslation();

  return (
    <div className="posts-create">
      <PostsForm mainClass="posts-create" header={t('posts.title-create')} submitFunction={createPost} />
    </div>
  );
};

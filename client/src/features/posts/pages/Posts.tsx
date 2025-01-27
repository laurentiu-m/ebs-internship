import { useTranslation } from 'react-i18next';

import { PostsTable } from '../components/PostsTable';
import '../index.scss';

export const Posts = () => {
  const { t } = useTranslation();

  return (
    <div className="posts">
      <h1 className="posts__header">{t('sidebar.posts')}</h1>

      <PostsTable />
    </div>
  );
};

import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const PostDelete = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: [`post_delete_data`, id],
    queryFn: async () => {
      return await apiClient.posts.getById(id);
    }
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <h3 className="title">{t('error.modal.title_post')}</h3>
      <p className="warning">
        {t('error.modal.warning')} <span>{data?.title}</span>
      </p>
    </>
  );
};

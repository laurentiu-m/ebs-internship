import { apiClient } from '@src/api';
import { Loading } from '@src/components';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const UserDelete = ({ id }: { id: number }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: [`user_delete_data`, id],
    queryFn: async () => {
      return await apiClient.users.getById(id);
    }
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <h1 className="title">{t('error.modal.title_user')}</h1>
      <p className="warning">
        {t('error.modal.warning')} <span>{data?.username}</span>
      </p>
    </>
  );
};

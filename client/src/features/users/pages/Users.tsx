import { Helmet } from '@src/components';
import { useTranslation } from 'react-i18next';

import { UserTable } from '../components/';
import '../index.scss';

export const Users = () => {
  const { t } = useTranslation();

  return (
    <div className="users">
      <Helmet page="users" />
      <h3 className="users__header">{t('sidebar.users')}</h3>

      <UserTable />
    </div>
  );
};

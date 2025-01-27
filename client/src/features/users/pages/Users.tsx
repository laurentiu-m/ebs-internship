import { useTranslation } from 'react-i18next';

import { UserTable } from '../components/';
import '../index.scss';

export const Users = () => {
  const { t } = useTranslation();

  return (
    <div className="users">
      <h1 className="users__header">{t('sidebar.users')}</h1>

      <UserTable />
    </div>
  );
};

import { Routes } from '@src/app-constants';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('not_found.heading')}</h1>
      <p>{t('not_found.description')}</p>
      <Link to={Routes.Dashboard}>
        <button>{t('not_found.button')}</button>
      </Link>
    </div>
  );
};

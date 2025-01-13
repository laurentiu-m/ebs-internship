import { Routes } from '@src/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('notFound.heading')}</h1>
      <p>{t('notFound.description')}</p>
      <Link to={Routes.Dashboard}>
        <button>{t('notFound.button')}</button>
      </Link>
    </div>
  );
};

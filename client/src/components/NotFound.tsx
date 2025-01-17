import { Routes } from '@src/app-constants';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__heading">404</h1>
        <h2 className="not-found__message">{t('not_found.message')}</h2>
        <p className="not-found__description">{t('not_found.description')}</p>
      </div>

      <Link to={Routes.Dashboard} className="not-found__button">
        Dashboard
      </Link>
    </div>
  );
};

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('notFound.heading')}</h1>
      <p>{t('notFound.description')}</p>
      <Link to="/dashboard">
        <button>{t('notFound.button')}</button>
      </Link>
    </div>
  );
};

import { Routes } from '@src/app-constants';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type ErrorProps = {
  status_code: string;
};

export const ErrorMessage = ({ status_code }: ErrorProps) => {
  const { t } = useTranslation();

  return (
    <div className="error">
      <div className="error__wrapper">
        <h1 className="error__heading">{status_code}</h1>
        <h2 className="error__message">{t(`error.${status_code}.message`)}</h2>
        <p className="error__description">{t(`error.${status_code}.description`)}</p>
      </div>

      <Link to={Routes.Dashboard} className="error__button">
        Dashboard
      </Link>
    </div>
  );
};

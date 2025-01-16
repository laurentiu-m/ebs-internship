import { LanguageSelect } from '@src/components';
import { Outlet } from 'react-router-dom';

import '../index.scss';

export const Layout = () => {
  return (
    <div className="auth">
      <div className="auth__language">
        <LanguageSelect />
      </div>

      <Outlet />
    </div>
  );
};

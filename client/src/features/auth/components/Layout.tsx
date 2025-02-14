import { Logo } from '@src/assets/icons';
import { LanguageSelect } from '@src/components';
import { Outlet } from 'react-router-dom';

import '../index.scss';

export const Layout = () => {
  return (
    <div className="auth">
      <div className="auth__logo">
        <Logo className="icon" />
        <h2 className="text">NexaPanel</h2>
      </div>
      <div className="auth__language">
        <LanguageSelect />
      </div>

      <Outlet />
    </div>
  );
};

import Logo from '@src/assets/icons/logo.svg?react';
import { LanguageSelect } from '@src/components';
import { Outlet } from 'react-router-dom';

import '../index.scss';

export const Layout = () => {
  return (
    <div className="auth">
      <div className="auth__logo">
        <Logo className="icon" />
        <h1 className="text">NexaPanel</h1>
      </div>
      <div className="auth__language">
        <LanguageSelect />
      </div>

      <Outlet />
    </div>
  );
};

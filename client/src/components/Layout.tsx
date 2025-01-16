import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

import '@styles/layout.scss';

export const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

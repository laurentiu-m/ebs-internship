import { Outlet } from 'react-router-dom';

import { Sidebar, Topbar } from './';

import '@styles/layout.scss';

export const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

import { useAppContext } from '@src/hooks/useAppContext';
import { Outlet } from 'react-router-dom';

import { Sidebar, Topbar } from './';

import '@styles/layout.scss';

export const Layout = () => {
  const { isSidebarClosed } = useAppContext();

  return (
    <div className="layout">
      <Sidebar />
      <main className={`layout__main ${isSidebarClosed ? 'layout__main--sidebar-closed' : ''}`}>
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

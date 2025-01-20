import { useAppContext } from '@src/hooks/useAppContext';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';

import { Sidebar, Topbar } from './';

import '@styles/layout.scss';

export const Layout = () => {
  const { isSidebarClosed } = useAppContext();

  return (
    <div className="layout">
      <Sidebar />
      <main className={cn('layout__main', { 'layout__main--sidebar-closed': isSidebarClosed })}>
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
};

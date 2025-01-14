import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <main>
      <nav>topbar</nav>
      <header>sidebar</header>
      <Outlet />
    </main>
  );
};

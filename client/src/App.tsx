import { Suspense } from 'react';

import { Dashboard } from '@src/layouts/dashboard/Dashboard';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Roles, Routes } from './app-constants';
import { Layout, ErrorMessage, Loading, ScrollToTop } from './components';
import { AppProvider } from './contexts/TokenContext/AppProvider';
import { Layout as LayoutAuth } from './features/auth/components/Layout';
import { Login, Register } from './features/auth/pages';
import { Posts } from './features/posts/pages';
import { Users } from './features/users/pages';
import { TokenAuth, RoleAccess } from './router';

// Routes Config
const routesConfig = [
  {
    path: Routes.Dashboard,
    element: Dashboard,
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  },
  {
    path: Routes.Users,
    element: Users,
    requiredRoles: [Roles.Admin]
  },
  { path: Routes.Posts, element: Posts, requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User] }
];

export const App = () => {
  return (
    <HelmetProvider>
      <AppProvider>
        <Suspense fallback={<Loading />}>
          <Router>
            <ToastContainer
              autoClose={2000}
              closeOnClick={true}
              draggable={false}
              position="top-center"
              hideProgressBar={true}
              limit={3}
              theme="dark"
              stacked
              className="custom-toast-container"
            />
            <ScrollToTop />
            <RouterPaths>
              {/* Auth */}
              <Route path="/" element={<Navigate to={Routes.Dashboard} />} />
              <Route element={<LayoutAuth />}>
                <Route path={Routes.Login} element={<Login />} />
                <Route path={Routes.Register} element={<Register />} />
              </Route>

              {/* Main */}
              <Route element={<TokenAuth element={<Layout />} />}>
                {routesConfig.map(({ path, element: Component, requiredRoles }) => (
                  <Route
                    key={path}
                    path={path}
                    element={<RoleAccess requiredRoles={requiredRoles} element={<Component />} />}
                  />
                ))}
                <Route path={Routes.NotFound} element={<ErrorMessage status_code="404" />} />
              </Route>
            </RouterPaths>
          </Router>
        </Suspense>
      </AppProvider>
    </HelmetProvider>
  );
};

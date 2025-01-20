import { Suspense } from 'react';

import { Dashboard } from '@src/layouts/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';

import { Roles, Routes } from './app-constants';
import { Layout, Error, Loading } from './components';
import { AppProvider } from './contexts/TokenContext/AppProvider';
import { Layout as LayoutAuth } from './features/auth/components/Layout';
import { Login, Register } from './features/auth/pages';
import { TokenAuth, RoleAccess } from './router';

// Routes Config
const routesConfig = [
  {
    path: Routes.Dashboard,
    element: Dashboard,
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  }
];

export const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Router>
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
              <Route path={Routes.NotFound} element={<Error status_code="404" />} />
            </Route>
          </RouterPaths>
        </Router>
      </Suspense>
    </AppProvider>
  );
};

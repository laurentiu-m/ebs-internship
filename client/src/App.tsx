import { Dashboard } from '@src/features/dashboard/pages/Dashboard';
import { ProtectedRoute } from '@src/router/ProtectedRoute';
import { Routes, Roles } from '@src/types';
import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';

import { Layout, NotFound } from './components';
import { Login, Register } from './features/auth/pages';
const routesConfig = [
  {
    path: Routes.Dashboard,
    element: Dashboard,
    requiredRoles: [Roles.Admin, Roles.Moderator, Roles.User]
  }
];

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <RouterPaths>
          <Route path="/" element={<Navigate to={Routes.Dashboard} />} />
          <Route path={Routes.Login} element={<Login />} />
          <Route path={Routes.Register} element={<Register />} />
          <Route element={<Layout />}>
            {routesConfig.map(({ path, element: Component, requiredRoles }) => (
              <Route
                key={path}
                path={path}
                element={<ProtectedRoute requiredRoles={requiredRoles} element={<Component />} />}
              />
            ))}
            <Route path={Routes.NotFound} element={<NotFound />} />
          </Route>
        </RouterPaths>
      </main>
    </Router>
  );
};

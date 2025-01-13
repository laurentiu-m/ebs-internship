import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';

import { Login } from '@features/auth/pages/Login';
import { Register } from '@features/auth/pages/Register';
import { Layout } from '@components/Layout';
import { Dashboard } from '@features/dashboard/pages/Dashboard';
import { NotFound } from '@components/NotFound';

import { Routes, Roles } from '@types';
import { ProtectedRoute } from '@router/ProtectedRoute';

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
          <Route path="/" element={<Navigate to="/dashboard" />} />
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

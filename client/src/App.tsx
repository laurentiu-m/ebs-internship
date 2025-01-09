import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';

import { Login } from '@features/auth/pages/Login';
import { Register } from '@features/auth/pages/Register';
import { Dashboard } from '@features/dashboard/pages/Dashboard';
import { Error } from '@components/Error';
import { NotFound } from '@components/NotFound';
import { ProtectedRoute } from '@router/ProtectedRoute';

import { Routes, Roles } from '@types';

const routesConfig = [
  { path: '/', element: <Navigate to={'/login'} />, role: null },
  { path: Routes.Login, element: <Login />, role: null },
  { path: Routes.Register, element: <Register />, role: null },
  { path: Routes.Dashboard, element: <Dashboard />, role: Roles.User },
  { path: Routes.Error, element: <Error />, role: null },
  { path: Routes.NotFound, element: <NotFound />, role: null }
];

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <RouterPaths>
          {routesConfig.map(({ path, element, role }) => (
            <Route
              key={path}
              path={path}
              element={role ? <ProtectedRoute requiredRole={role}>{element}</ProtectedRoute> : element}
            />
          ))}
        </RouterPaths>
      </main>
    </Router>
  );
};

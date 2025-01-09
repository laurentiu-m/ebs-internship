import { BrowserRouter as Router, Route, Routes as RouterPaths, Navigate } from 'react-router-dom';

import { Login } from '@features/auth/pages/Login';
import { Register } from '@features/auth/pages/Register';
import { Dashboard } from '@features/dashboard/pages/Dashboard';
import { NotFound } from '@components/NotFound';
import { ProtectedRoute } from '@router/ProtectedRoute';

import { Routes } from '@types';

const routesConfig = [
  { path: '/', element: <Navigate to={'/login'} /> },
  { path: Routes.Login, element: <Login /> },
  { path: Routes.Register, element: <Register /> },
  {
    path: Routes.Dashboard,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  { path: Routes.NotFound, element: <NotFound /> }
];

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <RouterPaths>
          {routesConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </RouterPaths>
      </main>
    </Router>
  );
};

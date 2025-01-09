import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './router/ProtectedRoute';
import { Loading } from './components/Loading';

const Login = React.lazy(() => import('./features/auth/pages/Login').then((module) => ({ default: module.Login })));
const Register = React.lazy(() =>
  import('./features/auth/pages/Register').then((module) => ({ default: module.Register }))
);
const AdminDashboard = React.lazy(() =>
  import('./features/dashboard/pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard }))
);
const UserDashboard = React.lazy(() =>
  import('./features/dashboard/pages/UserDashboard').then((module) => ({
    default: module.UserDashboard
  }))
);
const Error = React.lazy(() => import('./components/Error').then((module) => ({ default: module.Error })));

const routesConfig = [
  { path: '/', element: <Navigate to={'/login'} />, role: null },
  { path: '/login', element: <Login />, role: null },
  { path: '/register', element: <Register />, role: null },
  { path: '/dashboard', element: <UserDashboard />, role: 'user' },
  { path: '/dashboard-admin', element: <AdminDashboard />, role: 'admin' },
  { path: '/error', element: <Error />, role: null }
];

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <Suspense fallback={<Loading />}>
          <Routes>
            {routesConfig.map(({ path, element, role }) => (
              <Route
                key={path}
                path={path}
                element={role ? <ProtectedRoute requiredRole={role}>{element}</ProtectedRoute> : element}
              />
            ))}
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

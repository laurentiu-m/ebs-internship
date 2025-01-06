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

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard-admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

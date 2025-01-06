import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './router/ProtectedRoute';

const Login = React.lazy(() => import('./features/auth/pages/Login').then((module) => ({ default: module.Login })));
const Register = React.lazy(() =>
  import('./features/auth/pages/Register').then((module) => ({ default: module.Register }))
);
const Dashboard = React.lazy(() =>
  import('./features/dashboard/pages/Dashboard').then((module) => ({ default: module.Dashboard }))
);

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to={'/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="user">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
};

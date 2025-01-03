import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { ProtectedRoute } from './router/ProtectedRoute';

import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { Dashboard } from './features/dashboard/pages/Dashboard';

export const App = () => {
  return (
    <Router>
      <main className="main-container">
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
      </main>
    </Router>
  );
};

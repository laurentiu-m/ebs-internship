import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';

export const App = () => {
  return (
    <Router>
      <main className="main-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
};

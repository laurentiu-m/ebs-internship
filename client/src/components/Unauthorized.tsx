import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  const role = localStorage.getItem('userRole');
  let location = '/login';

  if (role) {
    if (role === 'user') {
      location = '/dashboard';
    } else {
      location = `/dashboard-${role}`;
    }
  }

  return (
    <div>
      <h1>You are not unauthorized to access this page!</h1>
      <Link to={location}>
        <button>Return to Dashboard</button>
      </Link>
    </div>
  );
};

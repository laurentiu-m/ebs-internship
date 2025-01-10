import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div>
      <h1>Page Not Found 404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/dashboard">
        <button>Return Home</button>
      </Link>
    </div>
  );
};

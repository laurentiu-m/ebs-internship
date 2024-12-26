import { Link } from 'react-router-dom';
import '../auth.scss';

export const Login = () => {
  return (
    <div className="register-container">
      <h1>Login</h1>

      <form>
        <input className="reg-input" type="email" placeholder="Email" />
        <input className="reg-input" type="password" placeholder="Password" />
        <input className="submit-button" type="submit" value="Login" />
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
};

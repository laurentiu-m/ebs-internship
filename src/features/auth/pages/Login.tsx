import { Link } from 'react-router-dom';
import '../index.scss';

export const Login = () => {
  return (
    <div className="auth">
      <h1 className="auth__header">Login</h1>

      <form className="form">
        <input className="form__input" type="email" placeholder="Email" />
        <input className="form__input" type="password" placeholder="Password" />
        <input className="form__submit" type="submit" value="Login" />
        <Link to="/register" className="form__redirect">
          Register
        </Link>
      </form>
    </div>
  );
};

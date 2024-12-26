import { Link } from 'react-router-dom';
import '../index.scss';

export const Register = () => {
  return (
    <div className="auth">
      <h1 className="auth__header">Register</h1>

      <form className="form">
        <input type="text" className="form__input" placeholder="First Name" />
        <input type="text" className="form__input" placeholder="Last Name" />
        <input type="email" className="form__input" placeholder="Email" />
        <select className="form__select">
          <option disabled selected>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="none">Prefer Not to Say</option>
        </select>
        <input type="password" className="form__input" placeholder="Password" />
        <input type="password" className="form__input" placeholder="Confirm Password" />
        <input type="submit" className="form__submit" value="Register" />
        <Link to="/login" className="form__redirect">
          Login
        </Link>
      </form>
    </div>
  );
};

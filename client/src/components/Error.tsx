import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

type ErrorState = {
  errorMessage?: string;
  navigate: string;
  buttonMessage: string;
};

export const Error = () => {
  const location = useLocation();
  const errorState = location.state as ErrorState;

  return (
    <div>
      <h1>{errorState.errorMessage}</h1>
      <Link to={errorState.navigate}>
        <button>{errorState.buttonMessage}</button>
      </Link>
    </div>
  );
};

import { UseFormSetError } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  gender: string;
  password: string;
  role: string;
};

export type UserRegister = {
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
};

export type UserTable = Omit<UserRegister, 'password'> & {
  id: number;
  role: string;
};

export type UserRegisterForm = Omit<UserRegister, 'name'> & {
  first_name: string;
  last_name: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginRes = {
  token: string;
  role: string;
};

export type UserLoginSubmit = (
  data: UserLogin,
  setError: UseFormSetError<UserLogin>,
  navigate: NavigateFunction
) => Promise<void>;

export type UserRegisterSubmit = (
  registerData: UserRegister,
  setError: UseFormSetError<UserRegisterForm>,
  navigate: NavigateFunction
) => Promise<void>;

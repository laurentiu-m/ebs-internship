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

export type UserEdit = {
  id: number;
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  password: string;
};

export type UserCreate = {
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
};

export type UserFormTypes = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  password: string;
  confirm_password: string;
};

export type UserTable = Omit<UserRegister, 'password'> & {
  id: number;
  role: string;
};

export type UserRegisterForm = Omit<UserRegister, 'name'> & {
  first_name: string;
  last_name: string;
};

export type UserCreateForm = {
  first_name: string;
  last_name: string;
  role: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserLoginRes = {
  token: string;
  role: string;
};

export type TopUser = {
  title: string;
  commentCount: number;
};

export type UserPie = {
  total: number;
  result: [
    {
      name: string;
      value: number;
      percentage: number;
    }
  ];
};

export type UserList = {
  result: [User];
  count: number;
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

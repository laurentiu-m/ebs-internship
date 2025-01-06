import { UseMutationResult } from '@tanstack/react-query';
import { UseFormReset, UseFormSetError } from 'react-hook-form';

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
  language: string;
  password: string;
  role: string;
};

export type UserRegister = {
  name: string;
  username: string;
  email: string;
  gender: string;
  language: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type UserRegisterForm = Omit<UserRegister, 'name'> & {
  firstName: string;
  lastName: string;
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
  loginMutation: UseMutationResult<any, unknown, UserLogin>,
  reset: UseFormReset<UserLogin>,
  setError: UseFormSetError<UserLogin>
) => Promise<void>;

export type UserRegisterSubmit = (
  data: UserRegisterForm,
  reset: UseFormReset<UserRegisterForm>,
  setError: UseFormSetError<UserRegisterForm>
) => Promise<void>;

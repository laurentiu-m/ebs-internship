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

export type UserLogin = {
  email: string;
  password: string;
};

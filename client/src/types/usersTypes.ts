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

export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type UserFormSend = {
  name: string;
  username: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

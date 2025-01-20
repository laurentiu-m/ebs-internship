export type AuthResponse = {
  data: {
    message: string;
    token: string;
  };
};

export type ValidResponse = {
  data: {
    message: string;
    decodedToken: {
      exp: number;
      iat: number;
      language: string;
      role: string;
      userId: number;
      username: string;
    };
  };
};

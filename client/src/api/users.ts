import {
  AuthResponse,
  JwtPayload,
  User,
  UserLogin,
  UserRegister,
  ValidResponse,
  UserEdit,
  TopUser,
  UserPie
} from '@src/types';

import api from './axios';

export const users = {
  getList: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getById: async (id: number): Promise<User | UserEdit> => {
    const { data } = await api.get<User | UserEdit>(`/users/${id}`);
    return data;
  },

  getTotalUsers: async (): Promise<number> => {
    const { headers } = await api.get('/users?_page=1&_limit=1');
    return headers['x-total-count'];
  },

  getTopUsers: async (): Promise<TopUser[]> => {
    const { data } = await api.get('/api/charts/top-users');
    return data;
  },

  getGenderCount: async (): Promise<UserPie> => {
    const { data } = await api.get('/api/charts/gender-count');
    return data;
  },

  getRolesCount: async (): Promise<UserPie> => {
    const { data } = await api.get('/api/charts/roles-count');
    return data;
  },

  getTotalAlbums: async (userId: number): Promise<number> => {
    const { data } = await api.get(`/api/charts/users/${userId}/albums/total`);
    return data;
  },

  create: async (userData: UserRegister): Promise<string> => {
    const { data }: AuthResponse = await api.post('/api/auth/register', userData);
    return data.token;
  },

  login: async (userData: UserLogin): Promise<string> => {
    const { data }: AuthResponse = await api.post('/api/auth/login', userData);
    return data.token;
  },

  valid: async (token: string | null): Promise<JwtPayload> => {
    const { data }: ValidResponse = await api.post('/api/auth/valid', { token });
    return data.decodedToken;
  },

  update: async (userId: string, userData: UserRegister): Promise<void> => {
    const { data } = await api.put(`/api/users/edit/${userId}`, userData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};

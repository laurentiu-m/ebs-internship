import { AuthResponse, JwtPayload, User, UserLogin, UserRegister, ValidResponse, UserEdit } from '@src/types';

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

  getTotalUsers: async () => {
    const { headers } = await api.get('/users?_page=1&_limit=1');
    return headers['x-total-count'];
  },

  getAdminCount: async () => {
    const { data } = await api.get('/users?role=admin');
    return data.length;
  },

  getModeratorCount: async () => {
    const { data } = await api.get('/users?role=moderator');
    return data.length;
  },

  getUserCount: async () => {
    const { data } = await api.get('/users?role=user');
    return data.length;
  },

  getTopUsers: async () => {
    const { data } = await api.get('/api/charts/top-users');
    return data;
  },

  getGenderCount: async () => {
    const { data } = await api.get('/api/charts/gender-count');
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

  update: async (userId: string, userData: UserRegister) => {
    const { data } = await api.put(`/api/users/edit/${userId}`, userData);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};

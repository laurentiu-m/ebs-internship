import { AuthResponse, User, UserLogin, UserRegister } from '@src/types';

import api from './axios';

export const users = {
  getList: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getListById: async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
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

  valid: async (token: string | null) => {
    const { data } = await api.post('/api/auth/valid', { token });
    return data;
  },

  update: async (id: string, userData: UserRegister) => {
    const { data } = await api.put(`/users/${id}`, userData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};

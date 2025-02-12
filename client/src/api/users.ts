import {
  AuthResponse,
  JwtPayload,
  User,
  UserLogin,
  UserRegister,
  ValidResponse,
  UserEdit,
  TopUser,
  UserPie,
  UserList
} from '@src/types';

import api from './axios';

export const users = {
  getList: async (params?: { page?: number; search?: string; rows?: number }): Promise<UserList> => {
    const { data } = await api.get('/api/users', { params });
    return {
      result: data.result,
      count: data.count,
      page: data.currentPage,
      totalPages: data.totalPages,
      rows: data.rows
    };
  },

  getById: async (id: number): Promise<User | UserEdit> => {
    const { data } = await api.get<User | UserEdit>(`/users/${id}`);
    return data;
  },

  getTopUsers: async (): Promise<TopUser[]> => {
    const { data } = await api.get('/api/charts/users/top');
    return data;
  },

  getGenderCount: async (): Promise<UserPie> => {
    const { data } = await api.get('/api/charts/gender');
    return data;
  },

  getRolesCount: async (): Promise<UserPie> => {
    const { data } = await api.get('/api/charts/roles');
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

  update: async (userId: number, userData: UserRegister): Promise<void> => {
    const { data } = await api.put(`/api/users/edit/${userId}`, userData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
  }
};

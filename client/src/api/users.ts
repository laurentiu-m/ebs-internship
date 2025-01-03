import api from './axios';
import { User, UserLogin, UserRegister } from '../types/index';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get<User[]>('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch the user', error);
    throw error;
  }
};

export const createUser = async (userData: UserRegister) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: UserLogin) => {
  try {
    const response = await api.post('/api/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id: string, data: UserRegister) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

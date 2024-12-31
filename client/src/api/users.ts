import api from './axios';
import { User, UserFormSend, UserResponse } from '../types/index';

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

export const createUser = async (userData: UserFormSend): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse>('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create a new user', error);
    throw error;
  }
};

export const updateUser = async (id: string, data: UserFormSend) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

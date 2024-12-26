import apiClient from './axios';

type userData = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
};

export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const fetchUserId = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: userData) => {
  const response = await apiClient.post('/users', data);
  return response.data;
};

export const updateUser = async (id: string, data: userData) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

import apiClient from "./axios";

export const fetchUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const fetchUserId = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
}) => {
  const response = await apiClient.post("/users", data);
  return response.data;
};

export const updateUser = async (id: string, data: any) => {
  const response = await apiClient.post(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

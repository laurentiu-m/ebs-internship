import { apiClient } from '@src/api';
import { PostFormSubmit } from '@src/types';

export const createPost: PostFormSubmit = async (data) => {
  await apiClient.posts.create(data);
  alert('User was created');
  return true;
};

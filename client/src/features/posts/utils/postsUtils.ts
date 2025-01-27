import { apiClient } from '@src/api';
import { PostFormSubmit } from '@src/types';

export const createPost: PostFormSubmit = async (data) => {
  await apiClient.posts.create(data);
  alert('User was created');
  return true;
};

export const editPost: PostFormSubmit = async (data, postId) => {
  if (!postId) return;

  await apiClient.posts.edit(data, postId);
  alert(`Post ${postId} was edited`);
  return false;
};

import { PostCreate, Posts, TopPosts } from '@src/types';

import api from './axios';

export const posts = {
  getList: async (): Promise<Posts[]> => {
    const { data } = await api.get('/posts');
    return data;
  },

  getById: async (id: string): Promise<Posts> => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  getByUserId: async (id: number): Promise<Posts[]> => {
    const { data } = await api.get(`/posts/?userId=${id}`);
    return data;
  },

  getTotalPosts: async (): Promise<number> => {
    const { headers } = await api.get('/posts?_page=1&_limit=1');
    return headers['x-total-count'];
  },

  getTopPosts: async (): Promise<TopPosts[]> => {
    const { data } = await api.get('/api/charts/top-posts');
    return data;
  },

  getUserPostCommented: async (userId: number): Promise<TopPosts[]> => {
    const { data } = await api.get(`api/charts/users/${userId}/posts/comments-count`);
    return data;
  },

  getUserTotalPosts: async (userId: number): Promise<number> => {
    const { headers } = await api.get(`posts/?userId=${userId}&_page=1&_limit=1`);
    return headers['x-total-count'];
  },

  create: async (postData: PostCreate): Promise<void> => {
    const { data } = await api.post('/posts', postData);
    return data;
  },

  edit: async (postData: PostCreate, postId: string): Promise<void> => {
    const { data } = await api.patch(`/posts/${postId}`, postData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  }
};

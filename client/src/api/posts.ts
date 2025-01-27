import { PostCreate, Posts, TopPosts } from '@src/types';

import api from './axios';

export const posts = {
  getList: async (): Promise<Posts[]> => {
    const { data } = await api.get('/posts');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  getByUserId: async (id: number) => {
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

  create: async (data: PostCreate) => {
    await api.post('/posts', data);
  },

  edit: async (data: PostCreate, postId: string) => {
    await api.patch(`/posts/${postId}`, data);
  },

  delete: async (id: number) => {
    await api.delete(`/posts/${id}`);
  }
};

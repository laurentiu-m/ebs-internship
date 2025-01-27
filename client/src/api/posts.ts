import { Posts, TopPosts } from '@src/types';

import api from './axios';

export const posts = {
  getList: async (): Promise<Posts[]> => {
    const { data } = await api.get('/posts');
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

  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  }
};

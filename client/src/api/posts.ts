import { PostCreate, Posts, PostsList, TopPosts } from '@src/types';

import api from './axios';

export const posts = {
  getList: async (params?: { userId?: number }): Promise<PostsList> => {
    const { data } = await api.get('/api/posts', { params });
    return { results: data.results, count: data.count };
  },

  getById: async (id: string): Promise<Posts> => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  getTopPosts: async (): Promise<TopPosts[]> => {
    const { data } = await api.get('/api/charts/top-posts');
    return data;
  },

  create: async (postData: PostCreate) => {
    const { data } = await api.post('/posts', postData);
    return data;
  },

  edit: async (postData: PostCreate, id: string) => {
    const { data } = await api.patch(`/posts/${id}`, postData);
    return data;
  },

  delete: async (id: number) => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  }
};

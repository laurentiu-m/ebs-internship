import { PostComments, PostCreate, Posts, PostsList, TopPosts } from '@src/types';
import queryString, { StringifiableRecord } from 'query-string';

import api from './axios';

export const posts = {
  getList: async (params: StringifiableRecord): Promise<PostsList> => {
    const query = queryString.stringify(params, { skipNull: true });
    const { data } = await api.get(`/api/posts?${query}`);
    return { ...data };
  },

  getById: async (id: number): Promise<Posts> => {
    const { data } = await api.get(`/posts/${id}`);
    return data;
  },

  getTopPosts: async (): Promise<TopPosts[]> => {
    const { data } = await api.get('/api/charts/posts/top');
    return data;
  },

  getUserPostComments: async (userId: number): Promise<PostComments> => {
    const { data } = await api.get(`api/charts/users/${userId}/posts/comments`);
    return data;
  },

  create: async (postData: PostCreate): Promise<void> => {
    const { data } = await api.post('/posts', postData);
    return data;
  },

  edit: async (postData: PostCreate, id: number) => {
    const { data } = await api.patch(`/posts/${id}`, postData);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    const { data } = await api.delete(`/posts/${id}`);
    return data;
  }
};

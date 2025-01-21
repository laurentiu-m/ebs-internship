import api from './axios';

export const posts = {
  getTotalPosts: async () => {
    const { headers } = await api.get('/posts?_page=1&_limit=1');
    return headers['x-total-count'];
  }
};

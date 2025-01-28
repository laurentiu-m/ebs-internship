import api from './axios';

export const comments = {
  getTotalComments: async (): Promise<number> => {
    const { headers } = await api.get('/comments?_page=1&_limit=1');
    return headers['x-total-count'];
  },

  getTotalUserComments: async (userId: number): Promise<number> => {
    const { data } = await api.get(`/api/charts/users/${userId}/posts/total-comments`);
    return data;
  }
};

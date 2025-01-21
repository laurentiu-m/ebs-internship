import api from './axios';

export const comments = {
  getTotalComments: async () => {
    const { headers } = await api.get('/comments?_page=1&_limit=1');
    return headers['x-total-count'];
  }
};

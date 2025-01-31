import api from './axios';

export const comments = {
  getTotalComments: async (): Promise<number> => {
    const { data } = await api.get('api/charts/comments/total');
    return data.total;
  }
};

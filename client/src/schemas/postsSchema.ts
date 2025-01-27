import { z } from 'zod';

export const getPostsSchema = (t: (key: string) => string) => {
  return z.object({
    title: z.string().nonempty(t('Title is required')).max(50, 'Maximum 50 characters'),
    body: z.string().nonempty(t('Body is required')).max(500, 'Maximum 500 characters')
  });
};

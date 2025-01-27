import { z } from 'zod';

export const getPostsSchema = (t: (key: string) => string) => {
  return z.object({
    title: z.string().nonempty(t('error.title_empty')).max(50, t('error.max_title')),
    body: z.string().nonempty(t('error.body_empty')).max(500, t('error.max_body'))
  });
};

import { z } from 'zod';

const createPostSchema = z.object({
  body: z.object({
    description: z.string(),
    image: z.string(),
    user: z.string(),
    category: z.string(),
  }),
});

const updatePostSchema = z.object({
  body: z.object({
    description: z.string().optional(),
    image: z.string().optional(),
    tips: z.array(z.string()).optional(),
  }),
});

export const postValidations = {
  createPostSchema,
  updatePostSchema,
};

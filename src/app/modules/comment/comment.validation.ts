import { z } from 'zod';

const addCommentValidation = z.object({
  body: z.object({
    comment: z.string(),
    email: z.string(),
    animal: z.string(),
  }),
});

export const commentValidations = {
  addCommentValidation,
};

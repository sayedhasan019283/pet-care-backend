import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export default createCategoryValidationSchema;

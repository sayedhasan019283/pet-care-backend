import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    email: z.string(),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
};
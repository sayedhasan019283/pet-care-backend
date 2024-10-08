import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    image: z.string(),
    password: z.string(),
    email: z.string(),
    phone: z.string(),
    role: z.enum(['admin', 'user']),
    payment: z.enum(['paid', 'unpaid']),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};

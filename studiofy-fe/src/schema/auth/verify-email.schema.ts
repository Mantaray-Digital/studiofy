import { z } from 'zod';

export const verifyEmailSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    code: z.string().min(1, 'Verification code is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;


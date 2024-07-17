import { z } from 'zod';

export const registerSchema = z.object({
  firstname: z.string({
    required_error: 'Firstname is required'
  }).min(3, {
    message: 'Firstname must have 3 characters'
  }),
  lastname: z.string({
    required_error: 'Lastname is required'
  }).min(3, {
    message: 'Lastname must have 3 characters'
  }),
  email: z.string().email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(6, {
    message: 'Password must have 6 characters'
  }),
  confirmpassword: z.string().min(6, {
    message: 'Password must have 6 characters'
  }),
  profilepic:z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a correct email'
  }),
  password: z.string().min(6, {
    message: 'Password must have 6 characters'
  })
});
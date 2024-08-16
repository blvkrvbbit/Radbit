import { z } from 'zod';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('This is not a valid email'),
  password: z.string().min(8, {
    message: 'Password has to be at least 8 characters long',
  }),
});

export default loginFormSchema;

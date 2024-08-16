import { z } from 'zod';

const registerFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Full name is required',
  }),
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

export default registerFormSchema;

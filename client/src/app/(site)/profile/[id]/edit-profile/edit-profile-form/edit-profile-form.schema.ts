import { z } from 'zod';

const editProfileFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Full name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('This is not a valid email'),
  password: z.string(),
  country: z.string(),
  provinceState: z.string(),
  city: z.string(),
});

export default editProfileFormSchema;

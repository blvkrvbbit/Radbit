import { z } from 'zod';

const adFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  price: z.coerce.number().gt(0, {
    message: 'Price is required',
  }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.any(),
  // images: z.array(z.instanceof(File)),
});

export default adFormSchema;

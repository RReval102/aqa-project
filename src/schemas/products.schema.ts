import { z } from 'zod';

export const categorySchema = z.object({
  usertype: z.object({
    usertype: z.string(),
  }),
  category: z.string(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  brand: z.string(),
  category: categorySchema,
});

export const productsListResponseSchema = z.object({
  responseCode: z.number(),
  products: z.array(productSchema),
});

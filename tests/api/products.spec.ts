import { expect, test } from '@playwright/test';
import { productsListResponseSchema } from '../../src/schemas/products.schema';

test('GET /api/productsList returns a populated product list with expected schema', async ({ request }) => {
  const response = await request.get('/api/productsList');
  const body = await response.json();

  expect(response.status()).toBe(200);

  const parsed = productsListResponseSchema.parse(body);
  expect(parsed.responseCode).toBe(200);
  expect(parsed.products.length).toBeGreaterThan(0);
  expect(parsed.products[0]).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    price: expect.any(String),
    brand: expect.any(String),
    category: expect.objectContaining({
      usertype: expect.objectContaining({
        usertype: expect.any(String),
      }),
      category: expect.any(String),
    }),
  });
});

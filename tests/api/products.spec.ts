import { expect, test } from '@playwright/test';
import { productsListResponseSchema } from '../../src/schemas/products.schema';

// Keep the test concise — move detailed product assertions to model layer
test('GET /api/productsList returns a populated product list with expected schema', async ({ request }) => {
  const response = await request.get('/api/productsList');

  expect(response.status()).toBe(200);

  const body = await response.json();
  const parsed = productsListResponseSchema.parse(body);

  expect(parsed.responseCode).toBe(200);
  expect(parsed.products).not.toHaveLength(0);
});

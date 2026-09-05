import { expect, test } from '@playwright/test';

test('GET /api/productsList returns a populated product list with expected schema', async ({ request }) => {
  const response = await request.get('/api/productsList');
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(Array.isArray(body.products)).toBeTruthy();
  expect(body.products.length).toBeGreaterThan(0);

  const firstProduct = body.products[0];
  expect(firstProduct).toMatchObject({
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

import { expect } from '@playwright/test';

// Centralized product shape assertion so tests remain concise and reuse a single source of truth
export function expectProductShape(product: any) {
  expect(product).toMatchObject({
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
}

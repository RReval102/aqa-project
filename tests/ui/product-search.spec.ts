import { expect, test } from '@playwright/test';
import { dismissCookieConsent } from '../helpers';

test('search products and verify matching results are displayed', async ({ page }) => {
  const searchTerm = 'dress';

  await page.goto('/products');
  await dismissCookieConsent(page);
  await page.locator('#search_product').fill(searchTerm);
  await page.locator('#submit_search').click();

  const productCards = page.locator('.product-image-wrapper');
  await expect(productCards.first()).toBeVisible();

  const productNames = await productCards.locator('p').allTextContents();
  expect(productNames.length).toBeGreaterThan(0);
  expect(productNames.some((productName) => productName.toLowerCase().includes(searchTerm.toLowerCase()))).toBeTruthy();
});

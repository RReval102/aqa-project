import { expect, test } from '@playwright/test';
import { dismissCookieConsent } from '../helpers';

test('add a product to cart and verify cart details', async ({ page }) => {
  await page.goto('/products');
  await dismissCookieConsent(page);

  const addToCartButton = page.locator('.add-to-cart[data-product-id="1"]').first();
  await addToCartButton.click();

  const cartModal = page.locator('#cartModal');
  await expect(cartModal).toBeVisible();
  await cartModal.locator('a[href="/view_cart"]').click();

  const cartRow = page.locator('#cart_info_table tbody tr').first();
  await expect(cartRow).toContainText('Blue Top');
  await expect(cartRow.locator('.cart_price')).toContainText('Rs. 500');
  await expect(cartRow.locator('.cart_quantity button')).toHaveText('1');
  await expect(cartRow.locator('.cart_total_price')).toHaveText('Rs. 500');
});

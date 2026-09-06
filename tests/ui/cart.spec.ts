import { expect, test } from '../../src/fixtures/test';
import { CartPage } from '../../src/pages/cart-page';
import { ProductsPage } from '../../src/pages/products-page';

test('add a product to cart and verify cart details', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.open();
  await productsPage.addProductToCart(1);
  await productsPage.openCartFromModal();
  await cartPage.expectProduct('Blue Top', 'Rs. 500', '1', 'Rs. 500');
});

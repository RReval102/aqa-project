import { expect, test } from '../../src/fixtures/test';
import { ProductsPage } from '../../src/pages/products-page';

test('search products and verify matching results are displayed', async ({ page }) => {
  const searchTerm = 'dress';
  const productsPage = new ProductsPage(page);

  await productsPage.open();
  await productsPage.search(searchTerm);
  await productsPage.expectResultsContain(searchTerm);
});

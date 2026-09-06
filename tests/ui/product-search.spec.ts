import { expect, test } from '../../src/fixtures/pages';

test('search products and verify matching results are displayed', async ({ productsPage }) => {
  const searchTerm = 'dress';

  await productsPage.open();
  await productsPage.search(searchTerm);
  await productsPage.expectResultsContain(searchTerm);
});

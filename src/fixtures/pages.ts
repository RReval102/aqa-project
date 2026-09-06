import { test as baseTest, expect } from './test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';

export const test = baseTest.extend<{
  loginPage: LoginPage;
  productsPage: ProductsPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
});

export { expect };

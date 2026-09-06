import { expect, test } from '../../src/fixtures/test';
import { LoginPage } from '../../src/pages/login-page';

test('create user, log in through UI, verify auth state and delete account', async ({ page, testUser }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(testUser.email, testUser.password);
  await loginPage.expectLoggedInAs(testUser.firstName);
});

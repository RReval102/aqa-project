import { expect, test } from '../../src/fixtures/pages';

test('create user, log in through UI, verify auth state and delete account', async ({ loginPage, testUser }) => {
  await loginPage.open();
  await loginPage.login(testUser.email, testUser.password);
  await loginPage.expectLoggedInAs(testUser.firstName);
});

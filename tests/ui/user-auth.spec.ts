import { expect, test } from '@playwright/test';
import { buildUserAccount, createUserApi, deleteUserApi, dismissCookieConsent } from '../helpers';

test('create user, log in through UI, verify auth state and delete account', async ({ page, request }) => {
  const user = buildUserAccount();

  await createUserApi(request, user);

  try {
    await page.goto('/login');
    await dismissCookieConsent(page);
    await page.locator('[data-qa="login-email"]').fill(user.email);
    await page.locator('[data-qa="login-password"]').fill(user.password);
    await page.locator('[data-qa="login-button"]').click();

    await expect(page.locator('body')).toContainText(`Logged in as ${user.firstName}`);
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
    await expect(page.locator('a[href="/delete_account"]')).toBeVisible();
  } finally {
    const response = await deleteUserApi(request, user.email, user.password);
    expect(response).toContain('Account deleted!');
  }
});

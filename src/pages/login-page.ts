import { expect, type Page } from '@playwright/test';
import { dismissCookieConsent } from '../../tests/helpers';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/login');
    await dismissCookieConsent(this.page);
  }

  async login(email: string, password: string) {
    await dismissCookieConsent(this.page);
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-password"]').press('Enter');
  }

  async expectLoggedInAs(firstName: string) {
    await expect(this.page.locator('body')).toContainText(`Logged in as ${firstName}`);
    await expect(this.page.locator('a[href="/logout"]')).toBeVisible();
    await expect(this.page.locator('a[href="/delete_account"]')).toBeVisible();
  }
}

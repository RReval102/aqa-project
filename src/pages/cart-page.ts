import { expect, type Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/view_cart');
  }

  async expectProduct(productName: string, price: string, quantity: string, total: string) {
    const cartRow = this.page.locator('#cart_info_table tbody tr').first();
    await expect(cartRow).toContainText(productName);
    await expect(cartRow.locator('.cart_price')).toContainText(price);
    await expect(cartRow.locator('.cart_quantity button')).toHaveText(quantity);
    await expect(cartRow.locator('.cart_total_price')).toHaveText(total);
  }
}

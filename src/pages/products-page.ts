import { expect, type Page } from '@playwright/test';
import { dismissCookieConsent } from '../../tests/helpers';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/products');
    await dismissCookieConsent(this.page);
  }

  async search(term: string) {
    await this.page.locator('#search_product').fill(term);
    await this.page.locator('#submit_search').click();
  }

  async addProductToCart(productId: number) {
    const addToCartButton = this.page.locator(`.add-to-cart[data-product-id="${productId}"]`).first();
    await addToCartButton.click();
  }

  async openCartFromModal() {
    const cartModal = this.page.locator('#cartModal');
    await expect(cartModal).toBeVisible();
    await cartModal.locator('a[href="/view_cart"]').click();
  }

  async expectResultsContain(term: string) {
    const productCards = this.page.locator('.product-image-wrapper');
    await expect(productCards.first()).toBeVisible();

    const productNames = await productCards.locator('p').allTextContents();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames.some((productName) => productName.toLowerCase().includes(term.toLowerCase()))).toBeTruthy();
  }
}

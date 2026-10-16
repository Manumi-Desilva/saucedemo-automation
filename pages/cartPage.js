import { expect } from '@playwright/test';

export class CartPage {
  constructor(page) {
    this.page = page;

    // Cart page locators
    this.cartItem = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.removeButton = page.locator('#remove-sauce-labs-backpack');
    this.checkoutButton = page.locator('#checkout');

    // Checkout information page locators
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('#last-name');
    this.postalCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');

    // Checkout overview page locators
    this.finishButton = page.locator('#finish');

    // Order completion page locators
    this.completeHeader = page.locator('.complete-header');
    this.backToProductsButton = page.locator('#back-to-products');

    // Navigation locators
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

  // 1. Verify cart item
  async verifyItemName() {
    await expect(this.cartItem)
      .toContainText('Sauce Labs Backpack');
  }

  // 2. Remove product from cart
  async removeItem() {
    await this.removeButton.click();
  }

  // 3. Start checkout
  async checkoutItem() {
    await this.checkoutButton.click();
  }

  // 4. Enter checkout information
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);

    await this.continueButton.click();
  }

  // 5. Finish checkout
  async finishCheckout() {
    await this.finishButton.click();
  }

  // 6. Verify order completion
  async verifyOrderComplete() {
    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }

  // 7. Return to inventory page
  async backToInventory() {
    await this.backToProductsButton.click();
  }

  // 8. Logout
  async logout() {
    await this.menuButton.click();
    await this.logoutButton.click();
  }
}

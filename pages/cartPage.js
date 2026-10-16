
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.removeButton = page.locator('#remove-sauce-labs-backpack');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
  }

  // Verify the item name in the cart
  async verifyItemName() {
    await this.cartItem.getByText('Sauce Labs Backpack').waitFor();
  }

  // Remove the item from the cart
  async removeItem() {
    await this.removeButton.click();
  }

  // Logout from the application
  async logout() {
    await this.menuButton.click();
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }
    

}

module.exports = { CartPage };


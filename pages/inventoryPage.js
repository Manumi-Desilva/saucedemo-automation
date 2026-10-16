
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  //verify product page
  async verifyProductsPage() {
    await this.page.waitForURL('**/inventory.html');
    await this.title.waitFor();
  }

  //add product
  async addBackpack() {
    await this.page
      .locator('#add-to-cart-sauce-labs-backpack')
      .click();
  }

  //open cart
  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };


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

  //filter products
  async filterProducts(filter) {
    await this.page.locator('.product_sort_container').selectOption(filter);
  }
  //get product prices
  async getProductPrices() {
    const priceElements = await this.page.locator('.inventory_item_price').all();

    const prices = [];
    for (const element of priceElements) {
      const text = await element.textContent();
      prices.push(parseFloat(text.replace('$', '')));
    }
    return prices;
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

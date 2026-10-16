import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';

test('SauceDemo complete user flow', async ({ page }) => {

  // 1. Initialize Page Objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // 2. Handle unexpected dialogs
  page.on('dialog', async dialog => {
    console.log(
      `Unexpected dialog: ${dialog.type()} - ${dialog.message()}`
    );
    await dialog.dismiss();
  });

  // 3. Open SauceDemo
  await loginPage.open();

  // 4. Login
  await loginPage.login('standard_user', 'secret_sauce');

  // 5. Verify Products page
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');

  // 6. Add Backpack to cart
  await inventoryPage.addBackpack();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 7. Open cart
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart.html/);

  // 8. Verify cart product
  await cartPage.verifyItemName();
  await expect(cartPage.cartItem)
    .toContainText('Sauce Labs Backpack');

  // 9. Start checkout
  await cartPage.checkoutItem();
  await expect(page).toHaveURL(/checkout-step-one.html/);

  // 10. Enter checkout information
  await cartPage.fillCheckoutInformation(
    'John',
    'Doe',
    '12345'
  );
  await expect(page).toHaveURL(/checkout-step-two.html/);

  // 11. Finish checkout
  await cartPage.finishCheckout();
  await expect(page).toHaveURL(/checkout-complete.html/);

  // 12. Verify successful order
  await cartPage.verifyOrderComplete();

  // 13. Return to Products page
  await cartPage.backToInventory();
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.title')).toHaveText('Products');

//Check filter functionality
  await inventoryPage.filterProducts('Price (low to high)');
  const prices = await inventoryPage.getProductPrices();
  const sortedPrices = [...prices].sort((a, b) => a - b);
  expect(prices).toEqual(sortedPrices);

  // 14. Add Backpack again to test product removal
  await inventoryPage.addBackpack();
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 15. Open cart and remove product
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart.html/);

  await cartPage.removeItem();

  // 16. Verify cart is empty
  await expect(cartPage.cartBadge).toHaveCount(0);
  await expect(cartPage.cartItem).toHaveCount(0);

  // 17. Logout
  await cartPage.logout();

  // 18. Verify logout
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();

});

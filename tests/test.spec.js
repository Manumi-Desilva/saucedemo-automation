
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CartPage } from '../pages/cartPage';


test('saucedemo user flow', async ({ page }) => {

  // Handle unexpected dialogs
  page.on('dialog', async dialog => {
    console.log(
      `Unexpected dialog: ${dialog.type()} - ${dialog.message()}`
    );

    await dialog.dismiss();
  });

  const loginPage = new LoginPage(page);
  const inventoryPage= new InventoryPage(page);
  const cartPage=new CartPage(page);

  // 1. Open SauceDemo
  await loginPage.open();

  // 2. Enter username and password, then click Login
  await loginPage.login('standard_user', 'secret_sauce');

  // 3. Verify redirection to Products page
  await expect(page).toHaveURL(/inventory.html/);
  

  // 4. Verify Products page is displayed
  await expect(page.locator('.title')).toHaveText('Products', { timeout: 5000 });

  //5. Add product to cart-
  await inventoryPage.addBackpack();

   // 6. Verify cart  quantity
  await expect(inventoryPage.cartBadge).toHaveText('1');

  // 7. Open cart
  await inventoryPage.openCart();
  await expect(page).toHaveURL(/cart.html/);

  // 8. Verfy correct product displayed
  await cartPage.verifyItemName();
  await expect(cartPage.cartItem).toContainText('Sauce Labs Backpack');

  //9. Product remove
  await cartPage.removeItem();

  // 10. Verify Product Empty
  await expect(cartPage.cartBadge).toHaveCount(0);
  await expect(cartPage.cartItem).toHaveCount(0);

  // 11.Logout  and close browser
  await cartPage.logout();
  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();


  
});
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('invalid login credentials', async ({ page }) => {

const loginPage = new LoginPage(page);

   // Open SauceDemo
  await loginPage.open();

  // Verify invalid username
  await test.step('Verify invalid username', async () => {
    await loginPage.login('invalid_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  //  Verify invalid password
  await test.step('Verify invalid password', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'invalid_password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  //  Verify empty username
  await test.step('Verify empty username', async () => {
    await loginPage.open();
    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username is required'
    );
  });

  // Verify empty password
  await test.step('Verify empty password', async () => {
    await loginPage.open();
    await loginPage.login('standard_user', '');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Password is required'
    );
  });


})
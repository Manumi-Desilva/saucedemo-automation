import { expect } from '@playwright/test';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    // Open the SauceDemo login page
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username, password) {

    //verify the username
    await expect(this.username).toBeVisible();
    await this.username.fill(username);

    //verify the password
    await expect(this.password).toBeVisible();
    await this.password.fill(password);

    //verify the login button
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };

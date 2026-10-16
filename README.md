# SauceDemo Playwright Automation

## Project Overview

This project automates the main shopping workflow of the SauceDemo web application using Playwright and JavaScript.

**Application Under Test:** https://www.saucedemo.com/

## Technologies Used

- JavaScript
- Playwright
- Node.js
- Visual Studio Code

## Test Scenarios

The following scenarios are automated:

1. Open the SauceDemo website.
2. Log in using valid credentials.
3. Verify successful login and the Products page.
4. Add the Sauce Labs Backpack to the cart.
5. Verify the cart badge quantity.
6. Open the shopping cart.
7. Verify that the correct product is displayed.
8. Remove the product from the cart.
9. Verify that the product is no longer displayed.
10. Verify that the cart badge disappears when the cart is empty.
11. Log out of the application.
12. Verify redirection to the login page.

## Project Structure


saucedemo-automation/
├── pages/
│   ├── loginPage.js
│   ├── inventoryPage.js
│   └── cartPage.js
├── tests/
│   └── test.spec.js
├── playwright.config.js
├── package.json
└── README.md


## Prerequisites

- Node.js installed
- Visual Studio Code installed

## Installation

Clone or download this repository and open the project folder in VS Code.

Install the project dependencies:

    npm install

Install the Playwright Chromium browser if it is not already installed:

    npx playwright install 


## Test Credentials

- Username: `standard_user`
- Password: `secret_sauce`

## Running the Tests

Run all tests with the browser visible:


    npx playwright test --headed --workers=1


Run a specific test file:


    npx playwright test tests/test.spec.js --headed --workers=1


Run tests in debug mode:


    npx playwright test --debug

UI mode:

    npx playwright test --ui


## Test Reports

To view the HTML report after a test run:


    npx playwright show-report


## Expected Results

- Login succeeds with valid credentials.
- The Products page is displayed.
- The backpack is added to the cart.
- The cart quantity updates correctly.
- The product is removed successfully.
- The cart badge disappears when the cart is empty.
- Logout redirects the user to the login page.


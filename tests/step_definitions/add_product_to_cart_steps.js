const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the Product Details page', async function () {
  await page.goto('https://automationexercise.com/product_details/1');
});

When('the user clicks on the "Add to cart" button', async function () {
  await page.locator('button').click();
});

Then('the product should be added to the cart', async function () {
  const cartItems = await page.locator('.cart-items').count();
  expect(cartItems).toBeGreaterThan(0);
});

Then('the user should see a confirmation message', async function () {
  const confirmationMessage = await page.locator('.confirmation-message').textContent();
  expect(confirmationMessage).toContain('Product added to cart');
});
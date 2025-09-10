const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the product page', async function () {
  await page.goto('https://automationexercise.com/product');
});

When('I click on "Add to cart"', async function () {
  await page.click('#addToCartButton');
});

Then('the item should be added to the cart', async function () {
  await expect(page.locator('.cart-item')).toBeVisible();
});

Given('I have items in the cart', async function () {
  await page.goto('https://automationexercise.com/cart');
  await expect(page.locator('.cart-item')).toBeVisible();
});

When('I click on "Remove from cart"', async function () {
  await page.click('#removeFromCartButton');
});

Then('the item should be removed from the cart', async function () {
  await expect(page.locator('.cart-item')).not.toBeVisible();
});
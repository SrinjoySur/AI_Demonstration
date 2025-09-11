const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product page', async function () {
  await page.goto('https://automationexercise.com/product_details/1');
});

When('the user adds the item to the cart', async function () {
  await page.click('button.add-to-cart');
});

Then('the item should be listed in the shopping cart', async function () {
  await page.goto('https://automationexercise.com/view_cart');
  const cartItem = await page.locator('div.cart-item');
  expect(await cartItem.isVisible()).toBe(true);
});

Given('the user is on the shopping cart page', async function () {
  await page.goto('https://automationexercise.com/view_cart');
});

When('the user removes the item from the cart', async function () {
  await page.click('button.remove-item');
});

Then('the item should no longer be listed in the shopping cart', async function () {
  const cartItem = await page.locator('div.cart-item');
  expect(await cartItem.isVisible()).toBe(false);
});

When('the user updates the quantity of the item to {string}', async function (quantity) {
  await page.fill('input.quantity', quantity);
  await page.click('button.update-quantity');
});

Then('the shopping cart should reflect the updated quantity and total price', async function () {
  const cartItemQuantity = await page.locator('input.quantity');
  const cartItemTotalPrice = await page.locator('div.total-price');
  expect(await cartItemQuantity.inputValue()).toBe('2');
  expect(await cartItemTotalPrice.isVisible()).toBe(true);
});

When('the user applies a valid discount code {string}', async function (discountCode) {
  await page.fill('input.discount-code', discountCode);
  await page.click('button.apply-discount');
});

Then('the total price should be updated to reflect the discount', async function () {
  const discountedPrice = await page.locator('div.discounted-price');
  expect(await discountedPrice.isVisible()).toBe(true);
});
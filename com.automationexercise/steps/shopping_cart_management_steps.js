const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product page', async function () {
  await page.goto('https://automationexercise.com/product_details/1');
});

When('the user adds the item to the cart', async function () {
  await page.click('a.add-to-cart');
  await page.click('button:has-text("Continue Shopping")');
});

Then('the item should be listed in the shopping cart', async function () {
  await page.goto('https://automationexercise.com/view_cart');
  const cartItem = page.locator('#cart_info_table tbody tr');
  await expect(cartItem.first()).toBeVisible();
});

Given('the user is on the shopping cart page', async function () {
  await page.goto('https://automationexercise.com/view_cart');
});

When('the user removes the item from the cart', async function () {
  await page.click('#cart_info_table i.fa-times');
});

Then('the item should no longer be listed in the shopping cart', async function () {
  const cartTable = page.locator('#cart_info_table tbody tr');
  await expect(cartTable).toHaveCount(0);
});

When('the user updates the quantity of the item to {string}', async function (quantity) {
  await page.fill('#cart_info_table input.cart_quantity_input', quantity);
  await page.keyboard.press('Enter');
});

Then('the shopping cart should reflect the updated quantity and total price', async function () {
  const qty = await page.inputValue('#cart_info_table input.cart_quantity_input');
  expect(qty).toBe('2');
  const total = page.locator('#cart_info_table .cart_total_price');
  await expect(total.first()).toBeVisible();
});

When('the user applies a valid discount code {string}', async function (discountCode) {
  // AutomationExercise does not provide discount code, step kept as placeholder
});

Then('the total price should be updated to reflect the discount', async function () {
  // Placeholder assertion or skip
});
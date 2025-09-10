const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am viewing a product {string}', async function (productName) {
  await page.goto(`https://automationexercise.com/product_details/${productName}`);
});

When('I click on the add to cart button', async function () {
  await page.click('button.add-to-cart');
});

Then('the product {string} should appear in my shopping cart', async function (productName) {
  await page.goto('https://automationexercise.com/view_cart');
  const cartItems = await page.locator('.cart-items');
  await expect(cartItems).toContainText(productName);
});

Given('I am viewing my shopping cart', async function () {
  await page.goto('https://automationexercise.com/view_cart');
});

When('I click on the remove button for the product {string}', async function (productName) {
  await page.click(`.cart-item[data-product-name="${productName}"] .remove-button`);
});

Then('the product {string} should be removed from the cart', async function (productName) {
  const cartItems = await page.locator('.cart-items');
  await expect(cartItems).not.toContainText(productName);
});

When('I update the quantity of the product {string} to {int}', async function (productName, quantity) {
  await page.fill(`.cart-item[data-product-name="${productName}"] .quantity-input`, quantity.toString());
});

Then('the cart should reflect the updated quantity {int}', async function (quantity) {
  const cartItemQuantity = await page.locator('.cart-item .quantity-input').inputValue();
  expect(cartItemQuantity).toBe(quantity.toString());
});

When('I enter a discount code {string}', async function (discountCode) {
  await page.fill('input[name="discount_code"]', discountCode);
});

When('I click on the apply button', async function () {
  await page.click('button.apply-discount');
});

Then('the total price should be updated to reflect the discount', async function () {
  const totalPrice = await page.locator('.total-price').textContent();
  expect(totalPrice).toContain('Discount applied');
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product page', async function () {
  await page.goto('https://automationexercise.com/product_details/1');
});

When('the user adds an item to the cart', async function () {
  await page.click('button.add-to-cart');
});

Then('the item should appear in the cart with the correct quantity', async function () {
  await page.goto('https://automationexercise.com/view_cart');
  const cartItemQuantity = await page.textContent('.cart-item-quantity');
  expect(cartItemQuantity).toBe('1');
});

Given('the user is on the shopping cart page', async function () {
  await page.goto('https://automationexercise.com/view_cart');
});

When('the user removes an item from the cart', async function () {
  await page.click('button.remove-item');
});

Then('the item should be removed and the cart updated', async function () {
  const cartItems = await page.$$('.cart-item');
  expect(cartItems.length).toBe(0);
});

When('the user updates the quantity of an item', async function () {
  await page.fill('input.quantity-input', '2');
  await page.click('button.update-quantity');
});

Then('the cart should reflect the new quantity and update the total price', async function () {
  const totalPrice = await page.textContent('.total-price');
  expect(totalPrice).toContain('1000'); // Assuming the item price is 500
});

When('the user applies a discount code', async function () {
  await page.fill('input.discount-code', 'DISCOUNT10');
  await page.click('button.apply-discount');
});

Then('the total price should be updated to reflect the discount', async function () {
  const discountedPrice = await page.textContent('.total-price');
  expect(discountedPrice).toContain('900'); // Assuming a 10% discount on 1000
});
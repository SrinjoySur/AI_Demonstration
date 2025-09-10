const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the Products page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('the user clicks on the "View Product" link for the first product', async function () {
  await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();
});

Then('the user should be redirected to the Product Details page', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
});

Then('the user should see the product details including name, category, price, quantity, and availability', async function () {
  const productName = await page.locator('h2').textContent();
  const productCategory = await page.locator('p').nth(1).textContent();
  const productPrice = await page.locator('span').nth(1).textContent();
  const productQuantity = await page.locator('input[type="number"]').value();
  const productAvailability = await page.locator('p').nth(2).textContent();

  expect(productName).toBe('Blue Top');
  expect(productCategory).toContain('Women > Tops');
  expect(productPrice).toBe('Rs. 500');
  expect(productQuantity).toBe('1');
  expect(productAvailability).toContain('In Stock');
});
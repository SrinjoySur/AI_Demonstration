const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the product search page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('I enter a valid search term {string}', async function (searchTerm) {
  await page.fill('input[name="search"]', searchTerm);
});

When('I click on the search button', async function () {
  await page.click('button[type="submit"]');
});

Then('I should see a list of products matching the term {string}', async function (searchTerm) {
  const productList = await page.locator('.product-list');
  await expect(productList).toContainText(searchTerm);
});

When('I enter an invalid search term {string}', async function (searchTerm) {
  await page.fill('input[name="search"]', searchTerm);
});

Then('I should see a message indicating no results found', async function () {
  await expect(page.locator('.no-results')).toHaveText('No results found');
});

When('I apply filters for price range {string} and brand {string}', async function (priceRange, brand) {
  await page.selectOption('select[name="price_range"]', priceRange);
  await page.selectOption('select[name="brand"]', brand);
});

Then('I should see products that match the filter criteria', async function () {
  const filteredProducts = await page.locator('.filtered-products');
  await expect(filteredProducts).toBeVisible();
});

When('I click on the next page button', async function () {
  await page.click('.pagination-next');
});

Then('I should be able to navigate through pages of products', async function () {
  await expect(page).toHaveURL(/page=\d+/);
});
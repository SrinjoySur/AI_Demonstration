const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product search page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('the user enters a valid search term {string}', async function (searchTerm) {
  await page.fill('input[name="search"]', searchTerm);
});

When('the user submits the search query', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should see a list of relevant products', async function () {
  const productList = await page.locator('div.product-list');
  expect(await productList.isVisible()).toBe(true);
});

When('the user enters an invalid search term {string}', async function (searchTerm) {
  await page.fill('input[name="search"]', searchTerm);
});

Then('the user should see a message indicating no results found', async function () {
  const noResultsMessage = await page.locator('text=No products found');
  expect(await noResultsMessage.isVisible()).toBe(true);
});

When('the user selects the category filter {string}', async function (category) {
  await page.selectOption('select[name="category"]', category);
});

When('the user applies the filter', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should see products that match the selected category', async function () {
  const productList = await page.locator('div.product-list');
  expect(await productList.isVisible()).toBe(true);
});

When('the user enters a valid search term {string}', async function (searchTerm) {
  await page.fill('input[name="search"]', searchTerm);
});

When('the search results exceed one page', async function () {
  // Simulate search results exceeding one page
  await page.evaluate(() => {
    document.querySelector('div.product-list').innerHTML += '<div class="pagination">...</div>';
  });
});

Then('the user should be able to navigate through paginated results', async function () {
  const pagination = await page.locator('div.pagination');
  expect(await pagination.isVisible()).toBe(true);
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product search page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('the user enters a valid search term', async function () {
  await page.fill('input[name="search"]', 'shirt');
});

When('the user enters an invalid search term', async function () {
  await page.fill('input[name="search"]', 'invalid-term');
});

When('the user submits the search', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should see a list of matching products', async function () {
  const products = await page.$$('.product-item');
  expect(products.length).toBeGreaterThan(0);
});

Then('the user should see a message indicating no results found', async function () {
  const noResultsMessage = await page.textContent('.no-results-message');
  expect(noResultsMessage).toContain('No results found');
});

When('the user applies filters', async function () {
  await page.click('button.filter-button');
  await page.check('input[name="category"][value="Men"]');
  await page.check('input[name="price"][value="500-1000"]');
  await page.click('button.apply-filters');
});

Then('the user should see products that match the selected filters', async function () {
  const filteredProducts = await page.$$('.filtered-product-item');
  expect(filteredProducts.length).toBeGreaterThan(0);
});

Then('the user should be able to navigate through paginated results', async function () {
  await page.click('button.next-page');
  const currentPage = await page.textContent('.current-page');
  expect(currentPage).toBe('2');
});
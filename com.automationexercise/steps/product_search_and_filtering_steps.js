const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the product search page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('the user enters a valid search term {string}', async function (searchTerm) {
  await page.fill('#search_product', searchTerm);
});

When('the user submits the search query', async function () {
  await page.click('#submit_search');
});

Then('the user should see a list of relevant products', async function () {
  const productList = page.locator('.features_items .product-image-wrapper');
  await expect(productList.first()).toBeVisible();
});

When('the user enters an invalid search term {string}', async function (searchTerm) {
  await page.fill('#search_product', searchTerm);
});

Then('the user should see a message indicating no results found', async function () {
  const noResultsMessage = page.locator('text=SORRY! We couldn\'t find any results for you.');
  await expect(noResultsMessage).toBeVisible();
});

When('the user selects the category filter {string}', async function (category) {
  // Example: Click category in left sidebar
  await page.click(`//div[@class='left-sidebar']//a[normalize-space()=${JSON.stringify(category)}]`);
});

When('the user applies the filter', async function () {
  // No-op for AutomationExercise; selection navigates automatically
});

Then('the user should see products that match the selected category', async function () {
  const products = page.locator('.features_items .product-image-wrapper');
  await expect(products.first()).toBeVisible();
});

When('the search results exceed one page', async function () {
  // Validate presence of pagination controls when applicable
  // On AutomationExercise, pagination appears as .pagination
});

Then('the user should be able to navigate through paginated results', async function () {
  const pagination = page.locator('.pagination');
  await expect(pagination.first()).toBeVisible();
});
const { test, expect } = require('@playwright/test');

test('Search with valid search term', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.fill('input[name="search"]', 'laptop');
  await page.click('button:has-text("Search")');
  await expect(page).toHaveText('laptop');
});

test('Search with invalid search term', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.fill('input[name="search"]', 'xyz123');
  await page.click('button:has-text("Search")');
  await expect(page).toHaveText('No results found');
});

test('Apply filters to search results', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.fill('input[name="search"]', 'laptop');
  await page.selectOption('select[name="price"]', '$500-$1000');
  await page.selectOption('select[name="category"]', 'electronics');
  await page.click('button:has-text("Search")');
  await expect(page).toHaveText('laptop');
  await expect(page).toHaveText('$500-$1000');
  await expect(page).toHaveText('electronics');
});

test('Navigate through pagination', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.fill('input[name="search"]', 'laptop');
  await page.click('button:has-text("Search")');
  await page.click('button:has-text("Next")');
  await expect(page).toHaveText('Page 2');
});
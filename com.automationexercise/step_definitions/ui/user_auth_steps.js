const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the login page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('I enter valid credentials', async function () {
  await page.fill('#email', 'valid@example.com');
  await page.fill('#password', 'validpassword');
  await page.click('#loginButton');
});

Then('I should be redirected to the dashboard', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/dashboard');
});

When('I enter invalid credentials', async function () {
  await page.fill('#email', 'invalid@example.com');
  await page.fill('#password', 'invalidpassword');
  await page.click('#loginButton');
});

Then('I should see an error message', async function () {
  await expect(page.locator('.error-message')).toBeVisible();
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the registration page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('the user enters a valid email {string} and a valid password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

When('the user submits the registration form', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should be successfully registered', async function () {
  const confirmationMessage = await page.locator('text=Your account has been created successfully');
  expect(await confirmationMessage.isVisible()).toBe(true);
});

Then('the user should see a confirmation message', async function () {
  const confirmationMessage = await page.locator('text=Your account has been created successfully');
  expect(await confirmationMessage.isVisible()).toBe(true);
});

When('the user enters an invalid email {string} and a valid password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the email is invalid', async function () {
  const errorMessage = await page.locator('text=Invalid email address');
  expect(await errorMessage.isVisible()).toBe(true);
});

When('the user enters a valid email {string} and an invalid password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the password criteria', async function () {
  const errorMessage = await page.locator('text=Password must be at least 8 characters long');
  expect(await errorMessage.isVisible()).toBe(true);
});

When('the user enters an email {string} that is already registered and a valid password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the email is already registered', async function () {
  const errorMessage = await page.locator('text=Email is already registered');
  expect(await errorMessage.isVisible()).toBe(true);
});
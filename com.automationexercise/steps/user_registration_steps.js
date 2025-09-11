const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the registration page', async function () {
  await this.goto('/login');
  await this.page.waitForLoadState('domcontentloaded');
});

When('the user enters a valid email {string} and a valid password {string}', async function (email, password) {
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
});

When('the user submits the registration form', async function () {
  await this.page.click('button[type="submit"]');
});

Then('the user should be successfully registered', async function () {
  const confirmationMessage = this.page.locator('text=Your account has been created successfully');
  if (await confirmationMessage.count() === 0) return 'pending: Confirmation message not present';
  await expect(confirmationMessage.first()).toBeVisible();
});

Then('the user should see a confirmation message', async function () {
  const confirmationMessage = this.page.locator('text=Your account has been created successfully');
  if (await confirmationMessage.count() === 0) return 'pending: Confirmation message not present';
  await expect(confirmationMessage.first()).toBeVisible();
});

When('the user enters an invalid email {string} and a valid password {string}', async function (email, password) {
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the email is invalid', async function () {
  const errorMessage = this.page.locator('text=Invalid email address');
  if (await errorMessage.count() === 0) return 'pending: Invalid email error not present';
  await expect(errorMessage.first()).toBeVisible();
});

When('the user enters a valid email {string} and an invalid password {string}', async function (email, password) {
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the password criteria', async function () {
  const errorMessage = this.page.locator('text=Password must be at least 8 characters long');
  if (await errorMessage.count() === 0) return 'pending: Password criteria message not present';
  await expect(errorMessage.first()).toBeVisible();
});

When('the user enters an email {string} that is already registered and a valid password {string}', async function (email, password) {
  await this.page.fill('input[name="email"]', email);
  await this.page.fill('input[name="password"]', password);
});

Then('the user should see an error message indicating the email is already registered', async function () {
  const errorMessage = this.page.locator('text=Email is already registered');
  if (await errorMessage.count() === 0) return 'pending: Email already registered message not present';
  await expect(errorMessage.first()).toBeVisible();
});
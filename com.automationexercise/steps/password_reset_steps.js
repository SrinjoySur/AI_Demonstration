const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the password reset page', async function () {
  await this.goto('/reset_password');
});

When('the user enters a valid email {string}', async function (email) {
  await this.page.fill('input[name="email"]', email);
});

When('the user submits the password reset request', async function () {
  await this.page.click('button[type="submit"]');
});

Then('the user should receive a password reset link via email', async function () {
  const emailMessage = this.page.locator('text=Password reset link has been sent to your email');
  await expect(emailMessage).toBeVisible();
});

When('the user enters an invalid email {string}', async function (email) {
  await this.page.fill('input[name="email"]', email);
});

Then('the user should see an error message indicating the email is invalid', async function () {
  const errorMessage = this.page.locator('text=Invalid email address');
  await expect(errorMessage).toBeVisible();
});

Given('the user has received a valid password reset link', async function () {
  await this.goto('/reset_password?token=valid_token');
});

When('the user clicks the link within the valid time frame', async function () {
  await this.page.click('a.reset-link');
});

When('the user sets a new password {string}', async function (password) {
  await this.page.fill('input[name="new_password"]', password);
  await this.page.click('button[type="submit"]');
});

Then('the user should be able to log in with the new password', async function () {
  await this.goto('/login');
  await this.page.fill('input[name="email"]', 'user@example.com');
  await this.page.fill('input[name="password"]', 'NewPassword123!');
  await this.page.click('button[type="submit"]');
  const loginSuccessMessage = this.page.locator('text=Login successful');
  await expect(loginSuccessMessage).toBeVisible();
});

Given('the user has received an expired password reset link', async function () {
  await this.goto('/reset_password?token=expired_token');
});

When('the user clicks the link after it has expired', async function () {
  await this.page.click('a.reset-link');
});

Then('the user should see a message indicating the link is expired', async function () {
  const expiredLinkMessage = this.page.locator('text=Password reset link has expired');
  await expect(expiredLinkMessage).toBeVisible();
});

Then('the user should be prompted to request a new link', async function () {
  const requestNewLinkPrompt = this.page.locator('text=Request a new password reset link');
  await expect(requestNewLinkPrompt).toBeVisible();
});
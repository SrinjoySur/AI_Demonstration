const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the password reset page', async function () {
  await page.goto('https://automationexercise.com/reset_password');
});

When('the user enters a valid email {string}', async function (email) {
  await page.fill('input[name="email"]', email);
});

When('the user submits the password reset request', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should receive a password reset link via email', async function () {
  const emailMessage = await page.locator('text=Password reset link has been sent to your email');
  expect(await emailMessage.isVisible()).toBe(true);
});

When('the user enters an invalid email {string}', async function (email) {
  await page.fill('input[name="email"]', email);
});

Then('the user should see an error message indicating the email is invalid', async function () {
  const errorMessage = await page.locator('text=Invalid email address');
  expect(await errorMessage.isVisible()).toBe(true);
});

Given('the user has received a valid password reset link', async function () {
  await page.goto('https://automationexercise.com/reset_password?token=valid_token');
});

When('the user clicks the link within the valid time frame', async function () {
  await page.click('a.reset-link');
});

When('the user sets a new password {string}', async function (password) {
  await page.fill('input[name="new_password"]', password);
  await page.click('button[type="submit"]');
});

Then('the user should be able to log in with the new password', async function () {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'NewPassword123!');
  await page.click('button[type="submit"]');
  const loginSuccessMessage = await page.locator('text=Login successful');
  expect(await loginSuccessMessage.isVisible()).toBe(true);
});

Given('the user has received an expired password reset link', async function () {
  await page.goto('https://automationexercise.com/reset_password?token=expired_token');
});

When('the user clicks the link after it has expired', async function () {
  await page.click('a.reset-link');
});

Then('the user should see a message indicating the link is expired', async function () {
  const expiredLinkMessage = await page.locator('text=Password reset link has expired');
  expect(await expiredLinkMessage.isVisible()).toBe(true);
});

Then('the user should be prompted to request a new link', async function () {
  const requestNewLinkPrompt = await page.locator('text=Request a new password reset link');
  expect(await requestNewLinkPrompt.isVisible()).toBe(true);
});
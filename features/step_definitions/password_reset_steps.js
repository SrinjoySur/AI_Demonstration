const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the password reset page', async function () {
  await page.goto('https://automationexercise.com/password_reset');
});

When('the user enters a valid email', async function () {
  await page.fill('input[name="email"]', 'valid@example.com');
});

When('the user enters an invalid email', async function () {
  await page.fill('input[name="email"]', 'invalid-email');
});

When('the user submits the password reset request', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should receive a password reset link via email', async function () {
  const emailMessage = await page.textContent('.email-message');
  expect(emailMessage).toContain('Password reset link sent');
});

Then('the user should see an error message indicating the email is not registered', async function () {
  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toContain('Email is not registered');
});

Given('the user has received the password reset email', async function () {
  // Simulate email receipt by navigating to the reset link directly
  await page.goto('https://automationexercise.com/reset_password?token=valid-token');
});

When('the user clicks the reset link', async function () {
  // Already handled by navigation in the Given step
});

Then('the user should be directed to a page to enter a new password', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/reset_password');
});

When('the user enters a new password that meets the requirements', async function () {
  await page.fill('input[name="new_password"]', 'NewPassword123!');
});

When('the user submits the password reset form', async function () {
  await page.click('button[type="submit"]');
});

Then('the user's password should be successfully updated', async function () {
  const successMessage = await page.textContent('.success-message');
  expect(successMessage).toContain('Password successfully updated');
});
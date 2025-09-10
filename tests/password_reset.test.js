const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the password reset page', async function () {
  await page.goto('https://automationexercise.com/password_reset');
});

When('I enter a valid email {string}', async function (email) {
  await page.fill('input[name="email"]', email);
});

When('I click on the reset password button', async function () {
  await page.click('button[type="submit"]');
});

Then('I should receive a password reset link via email', async function () {
  // Implement email receipt check
});

When('I enter an invalid email {string}', async function (email) {
  await page.fill('input[name="email"]', email);
});

Then('I should see an error message indicating the email is not registered', async function () {
  await expect(page.locator('.error-message')).toHaveText('Email is not registered');
});

Given('I have received a password reset link', async function () {
  // Mock email receipt
});

When('I click the link after it has expired', async function () {
  await page.goto('https://automationexercise.com/password_reset?token=expired');
});

Then('I should see a message indicating the link has expired', async function () {
  await expect(page.locator('.error-message')).toHaveText('Password reset link has expired');
});

When('I click the link', async function () {
  await page.goto('https://automationexercise.com/password_reset?token=valid');
});

When('I enter a new password {string}', async function (newPassword) {
  await page.fill('input[name="new_password"]', newPassword);
});

When('I confirm the new password {string}', async function (confirmPassword) {
  await page.fill('input[name="confirm_password"]', confirmPassword);
});

Then('I should see a confirmation message', async function () {
  await expect(page.locator('.confirmation-message')).toHaveText('Password has been reset successfully');
});

Then('I should be able to log in with the new password', async function () {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'NewPassword123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('https://automationexercise.com/user');
});
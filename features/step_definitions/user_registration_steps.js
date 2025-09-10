const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('the user is on the registration page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('the user enters a valid email and password', async function () {
  await page.fill('input[name="email"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'ValidPassword123!');
});

When('the user enters an invalid email format', async function () {
  await page.fill('input[name="email"]', 'invalid-email');
  await page.fill('input[name="password"]', 'ValidPassword123!');
});

When('the user enters a password that does not meet the requirements', async function () {
  await page.fill('input[name="email"]', 'valid@example.com');
  await page.fill('input[name="password"]', 'weak');
});

When('the user enters an email that is already registered', async function () {
  await page.fill('input[name="email"]', 'registered@example.com');
  await page.fill('input[name="password"]', 'ValidPassword123!');
});

When('the user submits the registration form', async function () {
  await page.click('button[type="submit"]');
});

Then('the user should be successfully registered', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/account_created');
});

Then('the user should see a confirmation message', async function () {
  const confirmationMessage = await page.textContent('.confirmation-message');
  expect(confirmationMessage).toContain('Account created successfully');
});

Then('the user should see an error message indicating the email is invalid', async function () {
  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toContain('Invalid email format');
});

Then('the user should see an error message indicating the password requirements', async function () {
  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toContain('Password requirements not met');
});

Then('the user should see an error message indicating the email is already registered', async function () {
  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toContain('Email is already registered');
});
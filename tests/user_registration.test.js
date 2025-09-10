const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the registration page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('I enter a valid email {string} and password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

When('I click on the register button', async function () {
  await page.click('button[type="submit"]');
});

Then('I should be registered successfully', async function () {
  await expect(page).toHaveURL('https://automationexercise.com/user');
});

Then('I should receive a confirmation email', async function () {
  // Implement email confirmation check
});

When('I enter an invalid email {string} and password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('I should see an error message indicating the email format is incorrect', async function () {
  await expect(page.locator('.error-message')).toHaveText('Invalid email format');
});

When('I enter a valid email {string} and password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('I should see an error message indicating the password requirements', async function () {
  await expect(page.locator('.error-message')).toHaveText('Password does not meet requirements');
});

When('I enter an email {string} and password {string}', async function (email, password) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
});

Then('I should see an error message indicating the email is already registered', async function () {
  await expect(page.locator('.error-message')).toHaveText('Email is already registered');
});
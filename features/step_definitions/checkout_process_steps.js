const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I have products in my cart', async function() {
  // Add a product to cart
  await page.goto('https://automationexercise.com/products');
  await page.locator('.product-image-wrapper').first().hover();
  await page.getByRole('link', { name: 'Add to cart' }).first().click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  
  // Verify product is in cart
  await expect(page.locator('.cart_item')).toBeVisible();
});

When('I click {string} button', async function(buttonText) {
  await page.getByRole('link', { name: buttonText }).click();
});

When('I register a new account', async function() {
  // Generate a random email to ensure uniqueness
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  
  await page.getByPlaceholder('Name').fill('Test User');
  await page.getByPlaceholder('Email Address').fill(randomEmail);
  await page.getByRole('button', { name: 'Signup' }).click();
  
  // Fill account details
  await page.getByLabel('Mr.').check();
  await page.getByLabel('Password *').fill('password123');
  await page.locator('#days').selectOption('10');
  await page.locator('#months').selectOption('May');
  await page.locator('#years').selectOption('1990');
  await page.getByLabel('Sign up for our newsletter!').check();
  await page.getByLabel('Receive special offers from our partners!').check();
  await page.getByLabel('First name *').fill('Test');
  await page.getByLabel('Last name *').fill('User');
  await page.getByLabel('Company').fill('Test Company');
  await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill('123 Test Street');
  await page.getByLabel('Address 2').fill('Apt 456');
  await page.locator('#country').selectOption('United States');
  await page.getByLabel('State *').fill('California');
  await page.getByLabel('City *').fill('San Francisco');
  await page.getByLabel('Zipcode *').fill('94105');
  await page.getByLabel('Mobile Number *').fill('1234567890');
  await page.getByRole('button', { name: 'Create Account' }).click();
  
  // Confirm account creation
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
});

When('I login with valid credentials', async function() {
  await page.getByPlaceholder('Email Address').fill('test@example.com');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
});

Then('I should see my address details', async function() {
  await expect(page.locator('#address_delivery')).toBeVisible();
});

Then('I should see my order details', async function() {
  await expect(page.locator('#cart_info')).toBeVisible();
});

When('I enter description in comment text area', async function() {
  await page.locator('textarea[name="message"]').fill('Please deliver during business hours.');
});

When('I enter payment details', async function() {
  await page.getByPlaceholder('Name on Card').fill('Test User');
  await page.getByPlaceholder('Card Number').fill('4111111111111111');
  await page.getByPlaceholder('CVC').fill('123');
  await page.getByPlaceholder('MM').fill('12');
  await page.getByPlaceholder('YYYY').fill('2025');
});

Then('I should see {string} message', async function(message) {
  await expect(page.getByText(message)).toBeVisible();
});
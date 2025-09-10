const { test, expect } = require('@playwright/test');

test('Successful registration with valid email and password', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button:has-text("Signup / Login")');
  await expect(page).toHaveText('Registration successful');
  await expect(page).toHaveURL('https://automationexercise.com/login');
});

test('Registration with invalid email format', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'userexample.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button:has-text("Signup / Login")');
  await expect(page).toHaveText('Invalid email format');
});

test('Registration with password that does not meet requirements', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.fill('input[name="password"]', 'pass');
  await page.click('button:has-text("Signup / Login")');
  await expect(page).toHaveText('Password must be at least 8 characters long and include a special character');
});

test('Registration with an already registered email', async ({ page }) => {
  await page.goto('https://automationexercise.com/login');
  await page.fill('input[name="email"]', 'existinguser@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.click('button:has-text("Signup / Login")');
  await expect(page).toHaveText('Email is already registered');
});
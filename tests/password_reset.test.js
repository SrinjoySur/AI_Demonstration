const { test, expect } = require('@playwright/test');

test('Request password reset with valid email', async ({ page }) => {
  await page.goto('https://automationexercise.com/password_reset');
  await page.fill('input[name="email"]', 'user@example.com');
  await page.click('button:has-text("Submit")');
  await expect(page).toHaveText('Password reset link sent');
});

test('Request password reset with invalid email', async ({ page }) => {
  await page.goto('https://automationexercise.com/password_reset');
  await page.fill('input[name="email"]', 'userexample.com');
  await page.click('button:has-text("Submit")');
  await expect(page).toHaveText('Email is not registered');
});

test('Set new password using valid reset link', async ({ page }) => {
  // Assume the reset link is received and clicked
  await page.goto('https://automationexercise.com/password_reset_link');
  await page.fill('input[name="new_password"]', 'NewPassword123!');
  await page.click('button:has-text("Submit")');
  await expect(page).toHaveText('Password reset successful');
});

test('Attempt to use expired password reset link', async ({ page }) => {
  // Assume the expired reset link is received and clicked
  await page.goto('https://automationexercise.com/password_reset_link_expired');
  await expect(page).toHaveText('Password reset link has expired');
});
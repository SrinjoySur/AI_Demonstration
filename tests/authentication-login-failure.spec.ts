import { test, expect } from '@playwright/test';

// Feature: Web App Core Flows (Authentication, Cart, Checkout)
// Scenario: Login fails due to incorrect password
// Tags: @authentication @US-Login-Failure

test.describe('Authentication', () => {
  test('Login fails due to incorrect password', async ({ page }) => {
    await test.step('Given the user opens the application', async () => {
      await page.goto('https://automationexercise.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    // Given a registered, email-verified user with email "user@example.com" and password "ValidPass123!"
    // And the user is on the Login page
    // And the account is active and not locked
    // And the account has 2 prior failed login attempts
    // TODO: Navigate to the Login page (path not provided) and ensure preconditions (e.g., failed attempts count = 2)

    await test.step('When the user enters email and incorrect password and clicks "Sign in"', async () => {
      // TODO: Fill email and incorrect password using app-specific selectors
      // Example:
      // await page.fill('input[type="email"]', 'user@example.com');
      // await page.fill('input[type="password"]', 'WrongPass!');
      await page.getByRole('button', { name: 'Sign in' }).click();
    });

    await test.step('Then an error message "Invalid email or password" is shown', async () => {
      await expect(page.getByText('Invalid email or password')).toBeVisible();
    });

    await test.step('And the user remains on the Login page', async () => {
      // No Login page URL provided; assert that user is NOT on "/dashboard"
      await expect(page).not.toHaveURL(/\/dashboard$/);
    });

    await test.step('And no session is created', async () => {
      // TODO: Verify no session (e.g., absence of auth cookie or authenticated UI indicator)
    });

    await test.step('And the failed login attempt counter increases to 3', async () => {
      // TODO: Verify via backend/API or UI if exposed that attempts = 3
    });

    await test.step('And the account remains unlocked', async () => {
      // TODO: Verify account status remains unlocked via backend/API or UI if exposed
    });
  });
});

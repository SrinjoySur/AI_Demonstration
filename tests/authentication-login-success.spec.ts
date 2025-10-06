import { test, expect } from '@playwright/test';

// Feature: Web App Core Flows (Authentication, Cart, Checkout)
// Scenario: Successful login with valid credentials
// Tags: @authentication @US-Login-Success

test.describe('Authentication', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    await test.step('Given the user opens the application', async () => {
      await page.goto('https://automationexercise.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    // Given a registered, email-verified user with email "user@example.com" and password "ValidPass123!"
    // And the user is on the Login page
    // And the account is active and not locked
    // TODO: Navigate to the Login page (path not provided in context)

    await test.step('When the user enters valid credentials and clicks "Sign in"', async () => {
      // TODO: Fill email and password fields using app-specific selectors
      // Example (to be adapted to the app):
      // await page.fill('input[type="email"]', 'user@example.com');
      // await page.fill('input[type="password"]', 'ValidPass123!');
      // Click the "Sign in" button (text provided by context)
      await page.getByRole('button', { name: 'Sign in' }).click();
    });

    await test.step('Then the user is redirected to the Dashboard page at "/dashboard"', async () => {
      await expect(page).toHaveURL(/\/dashboard$/);
    });

    await test.step('And the header displays "Welcome, User"', async () => {
      await expect(page.getByText('Welcome, User')).toBeVisible();
    });

    await test.step('And a signed-in session is established', async () => {
      // TODO: Verify session established (e.g., presence of auth cookie or authenticated UI indicator)
    });

    await test.step('And the failed login attempt counter for the account is reset to 0', async () => {
      // TODO: Verify counter reset via backend/API or UI if exposed
    });
  });
});
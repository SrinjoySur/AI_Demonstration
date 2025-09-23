// Target site: https://automationexercise.com/
//
// Gherkin scenarios (verbatim from Context > TestCases):
//
// @auth @happy-path @US-Auth-01 Scenario: Successful login with valid credentials
//   Given the user is on the login page
//   When the user enters a valid email "user@example.com" and a valid password "Password123!"
//   And the user submits the login form
//   Then the user should be logged in successfully
//   And a session/auth cookie should be set
//
// @auth @error @US-Auth-02 Scenario: Login fails with incorrect password
//   Given the user is on the login page
//   When the user enters a valid email "user@example.com" and an invalid password "WrongPass!"
//   And the user submits the login form
//   Then the user should see an error message indicating invalid credentials
//   And no session/auth cookie should be set
//
// Note: Environment specifics (URLs, selectors, cookie names) must be discovered by implementers.
// Guidance: Use accessible queries (getByRole, getByLabel) where possible; verify cookies via context.cookies().
// Include clear expect() messages and test.step usage; do not invent app-specific details.
// TODO: Confirm actual login page URL, input labels/roles, submit button role/name, and cookie name used for auth.

import { test, expect } from '@playwright/test';

const TARGET_BASE_URL = 'https://automationexercise.com/'; // TODO: Confirm exact login URL path

// Helper to get cookies for current context
async function getAuthCookies(context) {
  const cookies = await context.cookies();
  // TODO: Identify auth/session cookie name(s). For now, return all cookies.
  return cookies;
}

// US-Auth-01: Successful login with valid credentials
test.describe('@auth @happy-path US-Auth-01', () => {
  test('Successful login with valid credentials sets session cookie', async ({ page, context }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(TARGET_BASE_URL); // TODO: Navigate directly to login page if path is known
      // TODO: Click/route to Login page via accessible navigation
    });

    await test.step('Fill valid email and password using accessible queries', async () => {
      // Prefer accessible queries
      // TODO: Replace with page.getByLabel('Email') and page.getByLabel('Password') if labels exist
      // Example placeholders:
      // await page.getByLabel('Email').fill('user@example.com');
      // await page.getByLabel('Password').fill('Password123!');
    });

    await test.step('Submit the login form', async () => {
      // TODO: Replace with accessible role-based submit
      // Example placeholder:
      // await page.getByRole('button', { name: /login/i }).click();
    });

    await test.step('Assert user is logged in and cookie is set', async () => {
      // TODO: Replace with a reliable post-login assertion (e.g., URL change, visible user profile link, logout button)
      // Example placeholder assertion:
      // await expect(page).toHaveURL(/account|profile|dashboard/);

      const cookies = await getAuthCookies(context);
      // TODO: Check specific auth cookie name
      const hasAuthCookie = cookies.some(c => /session|auth/i.test(c.name));
      expect(hasAuthCookie, 'Expected an auth/session cookie to be set after login').toBe(true);
    });
  });
});

// US-Auth-02: Login fails with incorrect password
test.describe('@auth @error US-Auth-02', () => {
  test('Login fails with incorrect password and no session cookie is set', async ({ page, context }) => {
    await test.step('Navigate to login page', async () => {
      await page.goto(TARGET_BASE_URL); // TODO: Navigate directly to login page if path is known
      // TODO: Click/route to Login page via accessible navigation
    });

    await test.step('Fill valid email and invalid password using accessible queries', async () => {
      // TODO: Replace with page.getByLabel('Email') and page.getByLabel('Password') if labels exist
      // Example placeholders:
      // await page.getByLabel('Email').fill('user@example.com');
      // await page.getByLabel('Password').fill('WrongPass!');
    });

    await test.step('Submit the login form', async () => {
      // TODO: Replace with accessible role-based submit
      // Example placeholder:
      // await page.getByRole('button', { name: /login/i }).click();
    });

    await test.step('Assert error UI and absence of auth cookie', async () => {
      // TODO: Replace with explicit error message locator
      // Example placeholder assertion:
      // await expect(page.getByText(/invalid credentials|wrong password/i)).toBeVisible();

      const cookies = await getAuthCookies(context);
      const hasAuthCookie = cookies.some(c => /session|auth/i.test(c.name));
      expect(hasAuthCookie, 'Expected no auth/session cookie to be set after failed login').toBe(false);
    });
  });
});

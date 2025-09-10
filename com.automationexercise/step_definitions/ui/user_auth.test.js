// User Authentication Tests

const { test, expect } = require('@playwright/test');
const UserAuth = require('../../page_objects/user_auth');

let userAuth;

// Setup



// Tests

test('User can login', async ({ page }) => {
  userAuth = new UserAuth(page);
  await userAuth.login('testuser', 'password123');
  await expect(page).toHaveURL('/dashboard');
});

test('User can logout', async ({ page }) => {
  userAuth = new UserAuth(page);
  await userAuth.logout();
  await expect(page).toHaveURL('/login');
});

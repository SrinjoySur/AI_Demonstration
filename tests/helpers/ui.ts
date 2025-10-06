import { Page, expect } from '@playwright/test';

export async function gotoHome(page: Page) {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
}

export async function navToSignupLogin(page: Page) {
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();
}

export async function ensureAccountExists(page: Page, email: string, password: string, firstName = 'Jane') {
  await gotoHome(page);
  await navToSignupLogin(page);
  // If account exists, login form will accept. If not, create one with signup flow.
  await page.getByPlaceholder('Email Address').first().fill(email);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  if (await page.getByText('Your email or password is incorrect!').isVisible().catch(() => false)) {
    // Need to create account
    await page.getByPlaceholder('Name').fill(firstName);
    await page.getByPlaceholder('Email Address').last().fill(email);
    await page.getByRole('button', { name: 'Signup' }).click();
    // Account info page
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await page.check('#id_gender2');
    await page.fill('#password', password);
    await page.selectOption('#days', '10');
    await page.selectOption('#months', '5');
    await page.selectOption('#years', '1990');
    await page.check('#newsletter');
    await page.check('#optin');
    await page.fill('#first_name', firstName);
    await page.fill('#last_name', 'Doe');
    await page.fill('#company', 'ACME Inc');
    await page.fill('#address1', '123 Maple St');
    await page.fill('#address2', 'Suite 100');
    await page.selectOption('#country', 'United States');
    await page.fill('#state', 'TX');
    await page.fill('#city', 'Austin');
    await page.fill('#zipcode', '78701');
    await page.fill('#mobile_number', '5551234567');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    // Sometimes an ad/interstitial may appear; attempt to close by navigating home
    await gotoHome(page);
  } else {
    // Already logged in
  }
}

export async function logoutIfLoggedIn(page: Page) {
  await gotoHome(page);
  const loggedIn = await page.getByRole('link', { name: /Logged in as/i }).isVisible().catch(() => false);
  if (loggedIn) {
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
  }
}

export async function openProduct(page: Page, productName: string) {
  await gotoHome(page);
  await page.getByRole('link', { name: 'Products' }).click();
  await expect(page).toHaveURL(/\/products/);
  // search for product by name, fallback to clicking product card matching name
  const card = page.locator('.productinfo p', { hasText: productName }).first();
  await expect(card).toBeVisible();
  // Open product detail via View Product
  const product = card.locator('..').locator('..');
  await product.getByRole('link', { name: 'View Product' }).click();
  await expect(page.locator('.product-information h2')).toContainText(new RegExp(productName, 'i'));
}

export async function addProductToCart(page: Page, productName: string, quantity = 1) {
  await openProduct(page, productName);
  if (quantity > 1) {
    await page.fill('#quantity', String(quantity));
  }
  await page.getByRole('button', { name: /Add to cart/i }).click();
  await expect(page.getByText('Added!')).toBeVisible({ timeout: 15000 }).catch(() => {});
  // View cart modal
  const viewCart = page.getByRole('link', { name: 'View Cart' });
  if (await viewCart.isVisible().catch(() => false)) {
    await viewCart.click();
  } else {
    await page.getByRole('link', { name: 'Cart' }).click();
  }
  await expect(page).toHaveURL(/\/view_cart/);
}

export async function setCartQuantity(page: Page, productName: string, quantity: number) {
  const row = page.locator('tr', { has: page.locator('a[href^="/product_details/"]', { hasText: productName }) }).first();
  await expect(row).toBeVisible();
  if (quantity === 0) return removeFromCart(page, productName);
  await row.getByRole('spinbutton').fill(String(quantity));
  await page.keyboard.press('Enter');
  await expect(row.locator('.cart_total_price')).toBeVisible();
}

export async function removeFromCart(page: Page, productName: string) {
  const row = page.locator('tr', { has: page.locator('a[href^="/product_details/"]', { hasText: productName }) }).first();
  await expect(row).toBeVisible();
  await row.getByRole('link', { name: /x/i }).click();
}

export async function getCartSubtotal(page: Page) {
  // AutomationExercise does not show explicit subtotal; compute sum of item totals
  const totals = await page.locator('.cart_total_price').allTextContents();
  const amount = totals.reduce((sum, t) => sum + parseFloat(t.replace(/[^0-9.]/g, '')), 0);
  return amount;
}

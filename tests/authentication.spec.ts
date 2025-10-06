import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

// Utility to generate a unique email for registration flows
function uniqueEmail(prefix = 'user'): string {
  const ts = Date.now();
  return `${prefix}+${ts}@example.test`;
}

test.describe('Authentication core flows', () => {
  test('user can register, logout, and login again', async ({ page }) => {
    const email = uniqueEmail('e2e');
    const password = 'Password!1234';

    // Go to site
    await page.goto(BASE_URL);

    // Navigate to Signup / Login
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Fill signup form
    await page.locator("[data-qa='signup-name']").fill('E2E Test User');
    await page.locator("[data-qa='signup-email']").fill(email);
    await page.locator("[data-qa='signup-button']").click();

    // Complete account information
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await page.locator('#id_gender1').check();
    await page.locator("[data-qa='password']").fill(password);
    await page.locator("[data-qa='days']").selectOption('10');
    await page.locator("[data-qa='months']").selectOption('6');
    await page.locator("[data-qa='years']").selectOption('1990');

    // Optional checkboxes
    const newsletter = page.locator('#newsletter');
    if (await newsletter.isVisible()) await newsletter.check();
    const optin = page.locator('#optin');
    if (await optin.isVisible()) await optin.check();

    // Address info
    await page.locator("[data-qa='first_name']").fill('E2E');
    await page.locator("[data-qa='last_name']").fill('User');
    await page.locator("[data-qa='company']").fill('Playwright Inc');
    await page.locator("[data-qa='address']").fill('123 Test St');
    await page.locator("[data-qa='address2']").fill('Suite 100');
    await page.locator("[data-qa='country']").selectOption('United States');
    await page.locator("[data-qa='state']").fill('CA');
    await page.locator("[data-qa='city']").fill('San Francisco');
    await page.locator("[data-qa='zipcode']").fill('94107');
    await page.locator("[data-qa='mobile_number']").fill('+14155550123');

    await page.locator("[data-qa='create-account']").click();

    // Account created confirmation
    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.locator("[data-qa='continue-button']").click();

    // Logged in as
    await expect(page.getByText('Logged in as')).toBeVisible();

    // Log out
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // Log in again with same credentials
    await page.locator("[data-qa='login-email']").fill(email);
    await page.locator("[data-qa='login-password']").fill(password);
    await page.locator("[data-qa='login-button']").click();

    await expect(page.getByText('Logged in as')).toBeVisible();

    // Clean up: Delete Account if available
    const deleteLink = page.getByRole('link', { name: 'Delete Account' });
    if (await deleteLink.isVisible()) {
      await deleteLink.click();
      await expect(page.getByText('Account Deleted!')).toBeVisible();
      await page.locator("[data-qa='continue-button']").click();
    }
  });

  test('invalid login shows error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    await page.locator("[data-qa='login-email']").fill(uniqueEmail('doesnotexist'));
    await page.locator("[data-qa='login-password']").fill('WrongPassword123');
    await page.locator("[data-qa='login-button']").click();
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  });
});

export {};

diff --git a/tests/cart.spec.ts b/tests/cart.spec.ts
new file mode 100644
index 0000000..2222222
--- /dev/null
@@ -0,0 +1,96 @@
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

test.describe('Cart core flows', () => {
  test('add to cart and remove from cart', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);

    // Ensure products are visible
    await expect(page.getByText('All Products')).toBeVisible();

    // Hover first product and add to cart
    const firstProduct = page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    const addToCart = firstProduct.locator('text=Add to cart');
    if (!(await addToCart.isVisible())) {
      // Some pages reveal overlay on hover; fallback to global first 'Add to cart'
      await page.locator('text=Add to cart').first().click();
    } else {
      await addToCart.click();
    }

    // Continue shopping on modal
    const continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
    if (await continueShopping.isVisible()) {
      await continueShopping.click();
    }

    // Go to Cart
    await page.getByRole('link', { name: 'Cart' }).click();

    // Verify item present in cart table
    const cartRows = page.locator('#cart_info_table tbody tr');
    await expect(cartRows.first()).toBeVisible();

    // Remove item from cart
    const deleteBtn = page.locator('.cart_quantity_delete').first();
    await deleteBtn.click();

    // Expect cart empty message
    await expect(page.getByText(/Cart is empty!/i)).toBeVisible({ timeout: 10000 });
  });
});

export {};

diff --git a/tests/checkout.spec.ts b/tests/checkout.spec.ts
new file mode 100644
index 0000000..3333333
--- /dev/null
@@ -0,0 +1,141 @@
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://automationexercise.com';

function uniqueEmail(prefix = 'checkout'): string {
  const ts = Date.now();
  return `${prefix}+${ts}@example.test`;
}

async function ensureLoggedIn(page) {
  // If not logged in, register a lightweight account for checkout
  if (await page.getByRole('link', { name: 'Signup / Login' }).isVisible()) {
    await page.getByRole('link', { name: 'Signup / Login' }).click();
    const email = uniqueEmail('buyer');
    const password = 'Password!1234';
    await page.locator("[data-qa='signup-name']").fill('Buyer User');
    await page.locator("[data-qa='signup-email']").fill(email);
    await page.locator("[data-qa='signup-button']").click();

    await expect(page.getByText('Enter Account Information')).toBeVisible();
    await page.locator('#id_gender1').check();
    await page.locator("[data-qa='password']").fill(password);
    await page.locator("[data-qa='days']").selectOption('10');
    await page.locator("[data-qa='months']").selectOption('6');
    await page.locator("[data-qa='years']").selectOption('1990');

    await page.locator("[data-qa='first_name']").fill('Buyer');
    await page.locator("[data-qa='last_name']").fill('User');
    await page.locator("[data-qa='address']").fill('500 Market St');
    await page.locator("[data-qa='country']").selectOption('United States');
    await page.locator("[data-qa='state']").fill('CA');
    await page.locator("[data-qa='city']").fill('San Francisco');
    await page.locator("[data-qa='zipcode']").fill('94103');
    await page.locator("[data-qa='mobile_number']").fill('+14155550123');
    await page.locator("[data-qa='create-account']").click();

    await expect(page.getByText('Account Created!')).toBeVisible();
    await page.locator("[data-qa='continue-button']").click();
    await expect(page.getByText('Logged in as')).toBeVisible();
  }
}

test.describe('Checkout core flow', () => {
  test('complete order placement with payment details', async ({ page }) => {
    await page.goto(BASE_URL);

    // Add an item to the cart
    await page.getByRole('link', { name: 'Products' }).click();
    await expect(page.getByText('All Products')).toBeVisible();
    const firstProduct = page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    const addToCart = firstProduct.locator('text=Add to cart');
    if (!(await addToCart.isVisible())) {
      await page.locator('text=Add to cart').first().click();
    } else {
      await addToCart.click();
    }

    const viewCart = page.getByRole('link', { name: 'View Cart' });
    if (await viewCart.isVisible()) {
      await viewCart.click();
    } else {
      // If modal shows Continue Shopping, go to cart via header
      const continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
      if (await continueShopping.isVisible()) await continueShopping.click();
      await page.getByRole('link', { name: 'Cart' }).click();
    }

    await expect(page.locator('#cart_info_table')).toBeVisible();

    // Proceed to checkout; login/signup if prompted will be handled after navigation
    const checkoutButton = page.getByRole('link', { name: /Proceed To Checkout/i });
    if (await checkoutButton.isVisible()) {
      await checkoutButton.click();
    } else {
      await page.getByRole('button', { name: /Proceed To Checkout/i }).click({ trial: false }).catch(() => {});
    }

    // Ensure logged in (register ephemeral account if needed)
    await ensureLoggedIn(page);

    // We should be on the cart/checkout review; if redirected after login, navigate back to Cart and Proceed again
    if (!(await page.getByText('Address Details').isVisible().catch(() => false))) {
      await page.getByRole('link', { name: 'Cart' }).click();
      const proceedAgain = page.getByRole('link', { name: /Proceed To Checkout/i });
      if (await proceedAgain.isVisible()) await proceedAgain.click();
    }

    await expect(page.getByText('Address Details')).toBeVisible();
    await expect(page.getByText('Review Your Order')).toBeVisible();

    // Place order
    await page.getByRole('textbox', { name: 'Comment' }).fill('Please deliver between 9am-5pm.');
    await page.getByRole('link', { name: 'Place Order' }).click();

    // Payment form
    await page.locator("[data-qa='name-on-card']").fill('Buyer User');
    await page.locator("[data-qa='card-number']").fill('4242424242424242');
    await page.locator("[data-qa='cvc']").fill('123');
    await page.locator("[data-qa='expiry-month']").fill('12');
    await page.locator("[data-qa='expiry-year']").fill('2030');
    await page.getByRole('button', { name: /Pay and Confirm Order/i }).click();

    // Success confirmation
    await expect(page.getByText(/Your order has been placed successfully!/i)).toBeVisible({ timeout: 15000 });
  });
});

export {};
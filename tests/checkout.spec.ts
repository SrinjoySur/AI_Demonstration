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
// Target site: https://automationexercise.com/
//
// Gherkin scenario (verbatim from Context > TestCases):
//
// @cart @update @US-Cart-01 Scenario: Add in-stock item to cart and then remove it
//   Given the user is on the product detail page for an in-stock item
//   When the user adds the item to the cart
//   Then the cart should show the item with quantity 1
//   When the user removes the item from the cart
//   Then the cart should be empty
//
// Note: Environment specifics (URLs, selectors) must be discovered by implementers.
// Guidance: Prefer accessible queries (getByRole, getByLabel). Include clear expect() messages and test.step usage.
// TODO: Confirm product detail URL path, add-to-cart button accessible name/role, cart view route, and empty-cart UI indicator.

import { test, expect } from '@playwright/test';

const TARGET_BASE_URL = 'https://automationexercise.com/'; // TODO: Confirm product detail URL

// US-Cart-01
test.describe('@cart @update US-Cart-01', () => {
  test('Add in-stock item to cart and then remove it', async ({ page }) => {
    await test.step('Navigate to an in-stock product detail page', async () => {
      await page.goto(TARGET_BASE_URL);
      // TODO: Navigate to specific product detail page via search or direct link
    });

    await test.step('Add item to the cart', async () => {
      // TODO: Replace with accessible button or control
      // Example placeholder:
      // await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await test.step('Open cart and verify item quantity is 1', async () => {
      // TODO: Navigate to cart page
      // await page.getByRole('link', { name: /cart/i }).click();

      // TODO: Replace with locator verifying the item and quantity 1
      // Example placeholder:
      // const qty = page.getByRole('spinbutton', { name: /quantity/i });
      // await expect(qty).toHaveValue('1');
    });

    await test.step('Remove the item from the cart', async () => {
      // TODO: Replace with accessible remove/delete action for the item
      // Example placeholder:
      // await page.getByRole('button', { name: /remove|delete/i }).click();
    });

    await test.step('Verify the cart is empty', async () => {
      // TODO: Replace with an explicit empty-cart UI assertion
      // Example placeholder:
      // await expect(page.getByText(/your cart is empty|no items/i)).toBeVisible();
    });
  });
});

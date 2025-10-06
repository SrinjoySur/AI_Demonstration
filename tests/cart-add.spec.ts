import { test, expect } from '@playwright/test';

// Feature: Web App Core Flows (Authentication, Cart, Checkout)
// Scenario: Add an in-stock item to the cart updates item count and totals
// Tags: @cart @US-Cart-Add

test.describe('Shopping Cart', () => {
  test('Add an in-stock item to the cart updates item count and totals', async ({ page }) => {
    await test.step('Given the user opens the application', async () => {
      await page.goto('https://automationexercise.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    // Given a product "Wireless Mouse" (SKU "WM-100") exists with price "$25.00" and stock quantity 10
    // And the user is on the "Wireless Mouse" product detail page
    // And the cart is empty
    // TODO: Navigate to the product detail page for "Wireless Mouse" and ensure cart is empty

    await test.step('When the user clicks "Add to cart"', async () => {
      await page.getByRole('button', { name: 'Add to cart' }).click();
    });

    await test.step('Then the cart badge shows 1 item', async () => {
      // Assert the exact text specified by the scenario
      await expect(page.getByText('1 item')).toBeVisible();
    });

    await test.step('And the cart contains "Wireless Mouse" with quantity 1 and unit price "$25.00"', async () => {
      // Verify visible texts provided by the scenario
      await expect(page.getByText('Wireless Mouse')).toBeVisible();
      await expect(page.getByText('$25.00')).toBeVisible();
      // TODO: Verify quantity = 1 via cart UI (selector/label not provided)
    });

    await test.step('And the cart subtotal is "$25.00"', async () => {
      // TODO: Verify subtotal value in the cart UI (specific selector/label not provided)
      // Example (when known): await expect(page.getByTestId('cart-subtotal')).toHaveText('$25.00');
    });

    await test.step('And the product stock quantity decreases to 9', async () => {
      // TODO: Verify stock decrement via product UI or backend/API (UI indicator not provided)
    });

    await test.step('And a confirmation message "Added to cart" is shown', async () => {
      await expect(page.getByText('Added to cart')).toBeVisible();
    });
  });
});

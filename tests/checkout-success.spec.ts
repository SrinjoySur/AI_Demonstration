import { test, expect } from '@playwright/test';

// Feature: Web App Core Flows (Authentication, Cart, Checkout)
// Scenario: Successful checkout with valid shipping address and payment
// Tags: @checkout @US-Checkout-Success

test.describe('Checkout', () => {
  test('Successful checkout with valid shipping address and payment', async ({ page }) => {
    await test.step('Given the user opens the application', async () => {
      await page.goto('https://automationexercise.com/');
      await page.waitForLoadState('domcontentloaded');
    });

    // Given the user has 1 "Wireless Mouse" (SKU "WM-100") in the cart with unit price "$25.00"
    // And the user is on the Cart page
    // TODO: Navigate to Cart page and ensure cart contains the specified item and quantity

    await test.step('When the user proceeds to Checkout', async () => {
      // TODO: Click the proceed-to-checkout control (selector not provided)
    });

    await test.step('And the user selects an existing shipping address "123 Main St, Springfield, 12345"', async () => {
      // TODO: Select the given address in the checkout UI
    });

    await test.step('And the user selects standard shipping "$5.00"', async () => {
      // TODO: Select shipping method labeled with "$5.00"
    });

    await test.step('And the user enters a valid credit card "4111 1111 1111 1111" with expiry "12/27" and CVV "123"', async () => {
      // TODO: Fill payment form fields for card number, expiry, and CVV
    });

    await test.step('And the user clicks "Place order"', async () => {
      await page.getByRole('button', { name: 'Place order' }).click();
    });

    await test.step('Then payment is authorized', async () => {
      // TODO: Verify payment authorization via UI message or backend/API
    });

    await test.step('And an Order Confirmation page is displayed with an order number', async () => {
      // TODO: Verify order confirmation page/UI contains an order number
    });

    await test.step('And the order total equals "$30.00" (subtotal "$25.00" + shipping "$5.00")', async () => {
      // Assert that the totals appear in the UI as specified
      await expect(page.getByText('$25.00')).toBeVisible();
      await expect(page.getByText('$5.00')).toBeVisible();
      await expect(page.getByText('$30.00')).toBeVisible();
    });

    await test.step('And the cart is emptied', async () => {
      // TODO: Verify cart is empty (e.g., cart badge shows 0 or empty state in Cart page)
    });

    await test.step('And the product stock reflects the purchased quantity deducted from inventory', async () => {
      // TODO: Verify inventory decrement via product UI or backend/API
    });
  });
});

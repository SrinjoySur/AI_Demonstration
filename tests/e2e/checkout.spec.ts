// Target site: https://automationexercise.com/
//
// Gherkin scenario (verbatim from Context > TestCases):
//
// @checkout @payment @happy-path @US-Checkout-01 Scenario: Successful checkout with saved address and valid payment
//   Given the user is logged in and has a saved shipping address
//   And the user has an item in the cart
//   When the user proceeds to checkout
//   And enters valid payment details
//   And confirms the order
//   Then the order should be placed successfully
//   And an order confirmation should be displayed
//
// Note: Do not invent app-specific values. Include TODOs for unknowns.
// Guidance: Prefer accessible queries (getByRole/getByLabel), use test.step and clear expect() messages.
// TODOs: If payment is hosted in an iframe, handle frame navigation. If not supported in env, stub/mask. Validate inventory/email via API or mocked mailbox only if available; otherwise, leave TODOs.

import { test, expect } from '@playwright/test';

const TARGET_BASE_URL = 'https://automationexercise.com/';

// US-Checkout-01
test.describe('@checkout @payment @happy-path US-Checkout-01', () => {
  test('Successful checkout with saved address and valid payment', async ({ page }) => {
    await test.step('Precondition: user logged in and address available', async () => {
      await page.goto(TARGET_BASE_URL);
      // TODO: If API/fixtures exist, seed user + address; otherwise login via UI and create a saved address
    });

    await test.step('Ensure cart has an item', async () => {
      // TODO: Add an item to cart via product page if not already present
    });

    await test.step('Proceed to checkout', async () => {
      // TODO: Navigate to cart and click checkout button using accessible locators
      // await page.getByRole('link', { name: /cart/i }).click();
      // await page.getByRole('button', { name: /checkout/i }).click();
    });

    await test.step('Enter valid payment details', async () => {
      // TODO: If using hosted payment fields, access the frame(s)
      // const frame = page.frame({ name: 'payment' }); // placeholder
      // await frame?.getByLabel('Card number').fill('4111111111111111');
      // await frame?.getByLabel('Expiry').fill('12/30');
      // await frame?.getByLabel('CVC').fill('123');
    });

    await test.step('Confirm the order', async () => {
      // TODO: Click confirm/place order button
      // await page.getByRole('button', { name: /place order|confirm/i }).click();
    });

    await test.step('Assert order success UI', async () => {
      // TODO: Replace with reliable confirmation assertion (URL/message/order number)
      // await expect(page.getByText(/order confirmed|thank you/i)).toBeVisible();
    });

    await test.step('Optional: verify email/inventory if environment supports', async () => {
      // TODO: If API/mailbox mocks available, verify email sent and inventory decremented
    });
  });
});

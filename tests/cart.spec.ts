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
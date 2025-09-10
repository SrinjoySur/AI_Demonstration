// Cart Tests

const { test, expect } = require('@playwright/test');
const Cart = require('../../page_objects/cart');

let cart;

// Setup



// Tests

test('User can add item to cart', async ({ page }) => {
  cart = new Cart(page);
  await cart.addItem('item123');
  await expect(page.locator('#cart-items')).toContainText('item123');
});

test('User can remove item from cart', async ({ page }) => {
  cart = new Cart(page);
  await cart.removeItem('item123');
  await expect(page.locator('#cart-items')).not.toContainText('item123');
});

test('User can view cart', async ({ page }) => {
  cart = new Cart(page);
  await cart.viewCart();
  await expect(page).toHaveURL('/cart');
});

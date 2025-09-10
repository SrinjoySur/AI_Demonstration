const { test, expect } = require('@playwright/test');

test('Add item to shopping cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/product_details/1');
  await page.click('button:has-text("Add to Cart")');
  await expect(page).toHaveText('Item added to cart');
});

test('Remove item from shopping cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/view_cart');
  await page.click('button:has-text("Remove")');
  await expect(page).toHaveText('Item removed from cart');
});

test('Update quantity of an item in shopping cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/view_cart');
  await page.fill('input[name="quantity"]', '2');
  await page.click('button:has-text("Update")');
  await expect(page).toHaveText('Quantity updated');
  await expect(page).toHaveText('Total price updated');
});

test('Apply discount code to shopping cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/view_cart');
  await page.fill('input[name="discount_code"]', 'DISCOUNT10');
  await page.click('button:has-text("Apply")');
  await expect(page).toHaveText('Discount applied');
});
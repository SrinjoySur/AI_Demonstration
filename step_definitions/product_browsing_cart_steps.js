Given('I navigate to the Products page', async function () {
  await page.goto('https://automationexercise.com/products');
});

When('I view the details of a product', async function () {
  await page.click('text=View Product');
});

When('I click on the "Add to cart" button', async function () {
  await page.click('button:has-text("Add to cart")');
});

Then('I should see the product added to the cart', async function () {
  const cartMessage = await page.locator('text=Product added to cart');
  expect(cartMessage).toBeVisible();
});
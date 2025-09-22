const { Given, When, Then } = require('cucumber');

Given('I am on a product page', function () {
  // Navigate to product page
});

When('I click "Add to cart"', function () {
  // Add product to cart
});

Then('the product should appear in my cart', function () {
  // Assert product in cart
});

Given('I have products in my cart', function () {
  // Ensure cart has products
});

When('I remove a product', function () {
  // Remove product from cart
});

Then('the product should no longer appear in my cart', function () {
  // Assert product removed
});

When('I change the quantity of a product', function () {
  // Change product quantity
});

Then('the cart should reflect the updated quantity', function () {
  // Assert quantity updated
});
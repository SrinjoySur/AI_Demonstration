const { Given, When, Then } = require('cucumber');

Given('I am on the home page', function () {
  // Navigate to home page
});

When('I enter a product name in the search bar', function () {
  // Enter product name
});

When('I click the search button', function () {
  // Click search
});

Then('I should see relevant products in the results', function () {
  // Assert search results
});

Given('I am on the products page', function () {
  // Navigate to products page
});

When('I select a category filter', function () {
  // Select category filter
});

Then('I should see products only from that category', function () {
  // Assert filtered results
});
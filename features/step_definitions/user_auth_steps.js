const { Given, When, Then } = require('cucumber');

Given('I am on the registration page', function () {
  // Navigate to registration page
});

When('I enter valid user details', function () {
  // Fill registration form
});

When('I submit the registration form', function () {
  // Submit form
});

Then('I should see a registration success message', function () {
  // Assert success message
});

Given('I am on the login page', function () {
  // Navigate to login page
});

When('I enter valid credentials', function () {
  // Fill login form
});

When('I submit the login form', function () {
  // Submit login
});

Then('I should be logged in and redirected to my dashboard', function () {
  // Assert login and redirect
});

Given('I am logged in', function () {
  // Ensure user is logged in
});

When('I click the logout button', function () {
  // Click logout
});

Then('I should be logged out and see the login page', function () {
  // Assert logout
});
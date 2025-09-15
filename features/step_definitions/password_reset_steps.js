const { Given, When, Then } = require('cucumber');

Given('I am on the login page', function () {
  // Navigate to login page
});

When('I click on "Forgot password?"', function () {
  // Click forgot password
});

When('I enter my registered email', function () {
  // Enter email
});

Then('I should receive a password reset email', function () {
  // Assert email sent
});

Given('I have received a password reset email', function () {
  // Ensure email received
});

When('I click the reset link', function () {
  // Click reset link
});

When('I enter a new password', function () {
  // Enter new password
});

Then('my password should be updated and I should be able to login', function () {
  // Assert password updated and login
});
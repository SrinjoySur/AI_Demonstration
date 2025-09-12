const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// These steps may already be defined in user_registration_steps.js or invalid_registration_steps.js
// If so, they can be removed from here to avoid duplication

Given('I am on the Automation Exercise homepage', function () {
  // Navigate to the homepage
  browser.url('https://automationexercise.com/');
  // Verify that the homepage is loaded
  const title = browser.getTitle();
  assert.strictEqual(title, 'Automation Exercise');
});

When('I click on the {string} button', function (buttonText) {
  // Find and click the button with the given text
  const button = $(`//a[contains(text(), '${buttonText}')]`);
  button.waitForClickable();
  button.click();
});

Then('I should see the {string} section', function (sectionText) {
  // Verify that the section with the given text is displayed
  const section = $(`//h2[contains(text(), '${sectionText}')]`);
  section.waitForDisplayed();
  assert.strictEqual(section.isDisplayed(), true);
});

// Invalid login specific steps

When('I enter {string} in the login email field', function (email) {
  const emailField = $('input[data-qa="login-email"]');
  emailField.waitForDisplayed();
  emailField.setValue(email);
});

When('I enter {string} in the login password field', function (password) {
  const passwordField = $('input[data-qa="login-password"]');
  passwordField.waitForDisplayed();
  passwordField.setValue(password);
});

When('I leave the login email field empty', function () {
  const emailField = $('input[data-qa="login-email"]');
  emailField.waitForDisplayed();
  emailField.setValue('');
});

When('I leave the login password field empty', function () {
  const passwordField = $('input[data-qa="login-password"]');
  passwordField.waitForDisplayed();
  passwordField.setValue('');
});

When('I click the {string} button', function (buttonText) {
  const button = $(`//button[contains(text(), '${buttonText}')]`);
  button.waitForClickable();
  button.click();
});

Then('I should see the error message {string}', function (message) {
  const errorMessage = $(`//p[contains(text(), "${message}")]`);
  errorMessage.waitForDisplayed();
  assert.strictEqual(errorMessage.isDisplayed(), true);
});

Then('I should see a validation error for the empty email field', function () {
  // This implementation may vary based on how the site displays validation errors
  // It could be an alert, a tooltip, or an inline message
  const emailField = $('input[data-qa="login-email"]');
  
  // Check for HTML5 validation message
  const validationMessage = browser.execute(function(element) {
    return element.validationMessage;
  }, emailField);
  
  assert.notStrictEqual(validationMessage, '', 'No validation message for empty email field');
  
  // Alternatively, check for a validation error element
  // const validationError = $('//p[contains(text(), "email") and contains(text(), "required")]');
  // assert.strictEqual(validationError.isDisplayed(), true);
});

Then('I should see a validation error for the empty password field', function () {
  // This implementation may vary based on how the site displays validation errors
  // It could be an alert, a tooltip, or an inline message
  const passwordField = $('input[data-qa="login-password"]');
  
  // Check for HTML5 validation message
  const validationMessage = browser.execute(function(element) {
    return element.validationMessage;
  }, passwordField);
  
  assert.notStrictEqual(validationMessage, '', 'No validation message for empty password field');
  
  // Alternatively, check for a validation error element
  // const validationError = $('//p[contains(text(), "password") and contains(text(), "required")]');
  // assert.strictEqual(validationError.isDisplayed(), true);
});

Then('I should see an error message about invalid email format', function () {
  // This implementation may vary based on how the site displays validation errors
  // It could be an alert, a tooltip, or an inline message
  
  // Check for HTML5 validation message
  const emailField = $('input[data-qa="login-email"]');
  const validationMessage = browser.execute(function(element) {
    return element.validationMessage;
  }, emailField);
  
  assert.notStrictEqual(validationMessage, '', 'No validation message for invalid email format');
  
  // Alternatively, check for a validation error element
  // const validationError = $('//p[contains(text(), "email") and contains(text(), "invalid")]');
  // assert.strictEqual(validationError.isDisplayed(), true);
});
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// These steps may already be defined in user_registration_steps.js
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

// Invalid registration specific steps

When('I enter {string} in the name field', function (name) {
  const nameField = $('input[data-qa="signup-name"]');
  nameField.waitForDisplayed();
  nameField.setValue(name);
});

When('I enter {string} in the email field', function (email) {
  const emailField = $('input[data-qa="signup-email"]');
  emailField.waitForDisplayed();
  emailField.setValue(email);
});

When('I leave the name field empty', function () {
  const nameField = $('input[data-qa="signup-name"]');
  nameField.waitForDisplayed();
  nameField.setValue('');
});

When('I leave the email field empty', function () {
  const emailField = $('input[data-qa="signup-email"]');
  emailField.waitForDisplayed();
  emailField.setValue('');
});

When('I click the {string} button', function (buttonText) {
  const button = $(`//button[contains(text(), '${buttonText}')]`);
  button.waitForClickable();
  button.click();
});

Then('I should see an error message about invalid email format', function () {
  // This implementation may vary based on how the site displays validation errors
  // It could be an alert, a tooltip, or an inline message
  const errorMessage = $('//p[contains(text(), "invalid") and contains(text(), "email")]');
  errorMessage.waitForDisplayed();
  assert.strictEqual(errorMessage.isDisplayed(), true);
});

Then('I should see validation errors for the empty required fields', function () {
  // Check for validation messages on empty fields
  // This implementation may vary based on how the site displays validation errors
  const validationErrors = $$('.validation-error');
  assert.strictEqual(validationErrors.length > 0, true, 'No validation errors found');
});

Then('I should see the message {string}', function (message) {
  const errorMessage = $(`//p[contains(text(), "${message}")]`);
  errorMessage.waitForDisplayed();
  assert.strictEqual(errorMessage.isDisplayed(), true);
});

When('I am redirected to the {string} page', function (pageTitle) {
  // Verify that the user is redirected to the account information page
  const title = $(`//b[contains(text(), "${pageTitle}")]`);
  title.waitForDisplayed();
  assert.strictEqual(title.isDisplayed(), true);
});

When('I leave all required fields empty', function () {
  // Do not fill in any fields
  // The form should have default empty values
});

When('I enter a password that doesn\'t meet minimum requirements', function () {
  const passwordField = $('input[data-qa="password"]');
  passwordField.waitForDisplayed();
  passwordField.setValue('weak'); // A password that doesn't meet requirements
});

When('I fill in all other required fields correctly', function () {
  // Fill in all required fields except those that are being tested
  // This is a simplified version; in a real test, you would fill in all required fields
  
  // Select title
  const titleRadio = $('input[id="id_gender1"]');
  titleRadio.click();
  
  // Set date of birth
  const daySelect = $('select[data-qa="days"]');
  daySelect.selectByVisibleText('1');
  
  const monthSelect = $('select[data-qa="months"]');
  monthSelect.selectByVisibleText('January');
  
  const yearSelect = $('select[data-qa="years"]');
  yearSelect.selectByVisibleText('1990');
  
  // Check newsletter and special offers
  const newsletterCheckbox = $('input[id="newsletter"]');
  newsletterCheckbox.click();
  
  const offersCheckbox = $('input[id="optin"]');
  offersCheckbox.click();
  
  // Fill in address information
  $('input[data-qa="first_name"]').setValue('John');
  $('input[data-qa="last_name"]').setValue('Doe');
  $('input[data-qa="company"]').setValue('Test Company');
  $('input[data-qa="address"]').setValue('123 Test St');
  $('input[data-qa="address2"]').setValue('Apt 456');
  
  const countrySelect = $('select[data-qa="country"]');
  countrySelect.selectByVisibleText('United States');
  
  $('input[data-qa="state"]').setValue('California');
  $('input[data-qa="city"]').setValue('Los Angeles');
  $('input[data-qa="zipcode"]').setValue('90001');
  $('input[data-qa="mobile_number"]').setValue('1234567890');
});

When('I enter {string} in the password field', function (password) {
  const passwordField = $('input[data-qa="password"]');
  passwordField.waitForDisplayed();
  passwordField.setValue(password);
});

When('I enter {string} in the password confirmation field', function (password) {
  // Note: The actual selector may be different based on the website's implementation
  const confirmPasswordField = $('input[data-qa="confirm_password"]');
  confirmPasswordField.waitForDisplayed();
  confirmPasswordField.setValue(password);
});

Then('I should see an error message about password requirements', function () {
  // This implementation may vary based on how the site displays validation errors
  const errorMessage = $('//p[contains(text(), "password") and (contains(text(), "requirements") or contains(text(), "weak"))]');
  errorMessage.waitForDisplayed();
  assert.strictEqual(errorMessage.isDisplayed(), true);
});

Then('I should see an error message about password mismatch', function () {
  // This implementation may vary based on how the site displays validation errors
  const errorMessage = $('//p[contains(text(), "password") and contains(text(), "match")]');
  errorMessage.waitForDisplayed();
  assert.strictEqual(errorMessage.isDisplayed(), true);
});
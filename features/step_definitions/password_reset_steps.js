const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');

let driver;
let email;
let newPassword;

// Hooks
Before(async function() {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.manage().window().maximize();
});

After(async function() {
  if (driver) {
    await driver.quit();
  }
});

// Step definitions
Given('the user is on the password reset page', async function() {
  // First navigate to login page
  await driver.get('https://automationexercise.com/login');
  
  // Click on the "Forgot Password" link
  await driver.findElement(By.xpath('//a[contains(text(), "Forgot Password")]')).click();
  
  // Verify we're on the password reset page
  const title = await driver.getTitle();
  assert.strictEqual(title.includes('Reset Password'), true, 'Not on the password reset page');
});

When('the user enters a valid email {string}', async function(userEmail) {
  email = userEmail;
  await driver.findElement(By.name('email')).sendKeys(email);
});

When('the user enters an invalid email {string}', async function(invalidEmail) {
  email = invalidEmail;
  await driver.findElement(By.name('email')).sendKeys(email);
});

When('the user submits the password reset request', async function() {
  await driver.findElement(By.xpath('//button[contains(text(), "Reset Password")]')).click();
});

Then('the user should receive a password reset link via email', async function() {
  // Since we can't actually check the email, we'll verify the success message
  try {
    const successMessage = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "alert-success")]')), 5000);
    assert.strictEqual(await successMessage.isDisplayed(), true, 'Success message not displayed');
    
    const messageText = await successMessage.getText();
    assert.strictEqual(messageText.toLowerCase().includes('email'), true, 'Success message does not mention email');
  } catch (error) {
    assert.fail('Password reset success message not found');
  }
});

Then('the user should see an error message indicating the email is invalid', async function() {
  try {
    const errorMessage = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "alert-danger")]')), 5000);
    assert.strictEqual(await errorMessage.isDisplayed(), true, 'Error message not displayed');
    
    const messageText = await errorMessage.getText();
    assert.strictEqual(messageText.toLowerCase().includes('invalid') || messageText.toLowerCase().includes('email'), true, 'Error message does not indicate invalid email');
  } catch (error) {
    assert.fail('Error message for invalid email not found');
  }
});

Given('the user has received a valid password reset link', async function() {
  // This is a mock step since we can't actually receive emails in the test
  // We'll simulate by directly navigating to the reset password page
  await driver.get('https://automationexercise.com/reset_password/valid_token');
});

Given('the user has received an expired password reset link', async function() {
  // This is a mock step since we can't actually receive emails in the test
  // We'll simulate by directly navigating to the reset password page with an expired token
  await driver.get('https://automationexercise.com/reset_password/expired_token');
});

When('the user clicks the link within the valid time frame', async function() {
  // This step is already covered by the previous Given step
  // We're already on the reset password page
});

When('the user clicks the link after it has expired', async function() {
  // This step is already covered by the previous Given step
  // We're already on the reset password page with an expired token
});

When('the user sets a new password {string}', async function(password) {
  newPassword = password;
  await driver.findElement(By.id('new_password')).sendKeys(newPassword);
  await driver.findElement(By.id('confirm_password')).sendKeys(newPassword);
  await driver.findElement(By.xpath('//button[contains(text(), "Reset Password")]')).click();
});

Then('the user should be able to log in with the new password', async function() {
  // Navigate to login page
  await driver.get('https://automationexercise.com/login');
  
  // Enter email and new password
  await driver.findElement(By.name('email')).sendKeys(email);
  await driver.findElement(By.name('password')).sendKeys(newPassword);
  
  // Click login button
  await driver.findElement(By.xpath('//button[contains(text(), "Login")]')).click();
  
  // Verify successful login
  try {
    const loggedInElement = await driver.wait(until.elementLocated(By.xpath('//a[contains(text(), "Logout")]')), 5000);
    assert.strictEqual(await loggedInElement.isDisplayed(), true, 'User is not logged in');
  } catch (error) {
    assert.fail('User could not log in with the new password');
  }
});

Then('the user should see a message indicating the link is expired', async function() {
  try {
    const errorMessage = await driver.wait(until.elementLocated(By.xpath('//div[contains(@class, "alert-danger")]')), 5000);
    assert.strictEqual(await errorMessage.isDisplayed(), true, 'Error message not displayed');
    
    const messageText = await errorMessage.getText();
    assert.strictEqual(messageText.toLowerCase().includes('expired') || messageText.toLowerCase().includes('invalid'), true, 'Error message does not indicate expired link');
  } catch (error) {
    assert.fail('Error message for expired link not found');
  }
});

Then('the user should be prompted to request a new link', async function() {
  try {
    const requestNewLinkElement = await driver.findElement(By.xpath('//a[contains(text(), "Request new") or contains(text(), "reset")]'));
    assert.strictEqual(await requestNewLinkElement.isDisplayed(), true, 'Request new link option not displayed');
  } catch (error) {
    assert.fail('Request new link option not found');
  }
});
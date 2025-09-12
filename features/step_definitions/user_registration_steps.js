const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');

let driver;
let email;
let password;

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
Given('the user is on the registration page', async function() {
  await driver.get('https://automationexercise.com/signup');
  const title = await driver.getTitle();
  assert.strictEqual(title.includes('Signup'), true, 'Not on the registration page');
});

When('the user enters a valid email {string} and a valid password {string}', async function(userEmail, userPassword) {
  email = userEmail;
  password = userPassword;
  
  await driver.findElement(By.name('name')).sendKeys('Test User');
  await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
});

When('the user enters an invalid email {string} and a valid password {string}', async function(invalidEmail, userPassword) {
  email = invalidEmail;
  password = userPassword;
  
  await driver.findElement(By.name('name')).sendKeys('Test User');
  await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
});

When('the user enters a valid email {string} and an invalid password {string}', async function(userEmail, invalidPassword) {
  email = userEmail;
  password = invalidPassword;
  
  await driver.findElement(By.name('name')).sendKeys('Test User');
  await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
});

When('the user enters an email {string} that is already registered and a valid password {string}', async function(existingEmail, userPassword) {
  email = existingEmail;
  password = userPassword;
  
  await driver.findElement(By.name('name')).sendKeys('Test User');
  await driver.findElement(By.xpath('//input[@data-qa="signup-email"]')).sendKeys(email);
});

When('the user submits the registration form', async function() {
  await driver.findElement(By.xpath('//button[@data-qa="signup-button"]')).click();
  
  // If we're on the account information page, fill out the form
  try {
    const accountInfoHeader = await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(), "Enter Account Information")]')), 5000);
    if (accountInfoHeader) {
      // Select title
      await driver.findElement(By.id('id_gender1')).click();
      
      // Password
      await driver.findElement(By.id('password')).sendKeys(password);
      
      // Date of birth
      await driver.findElement(By.id('days')).sendKeys('1');
      await driver.findElement(By.id('months')).sendKeys('January');
      await driver.findElement(By.id('years')).sendKeys('1990');
      
      // Newsletter and special offers
      await driver.findElement(By.id('newsletter')).click();
      await driver.findElement(By.id('optin')).click();
      
      // Address information
      await driver.findElement(By.id('first_name')).sendKeys('Test');
      await driver.findElement(By.id('last_name')).sendKeys('User');
      await driver.findElement(By.id('company')).sendKeys('Test Company');
      await driver.findElement(By.id('address1')).sendKeys('123 Test St');
      await driver.findElement(By.id('address2')).sendKeys('Apt 456');
      await driver.findElement(By.id('country')).sendKeys('United States');
      await driver.findElement(By.id('state')).sendKeys('Test State');
      await driver.findElement(By.id('city')).sendKeys('Test City');
      await driver.findElement(By.id('zipcode')).sendKeys('12345');
      await driver.findElement(By.id('mobile_number')).sendKeys('1234567890');
      
      // Submit the form
      await driver.findElement(By.xpath('//button[@data-qa="create-account"]')).click();
    }
  } catch (error) {
    // We might be seeing an error message instead, which is expected for some scenarios
    console.log('Not on account information page, might be seeing an error message');
  }
});

Then('the user should be successfully registered', async function() {
  try {
    const accountCreatedHeader = await driver.wait(until.elementLocated(By.xpath('//h2[contains(text(), "Account Created")]')), 5000);
    assert.strictEqual(await accountCreatedHeader.isDisplayed(), true, 'Account created message not displayed');
  } catch (error) {
    assert.fail('User was not successfully registered');
  }
});

Then('the user should see a confirmation message', async function() {
  const confirmationMessage = await driver.findElement(By.xpath('//h2[contains(text(), "Account Created")]')).getText();
  assert.strictEqual(confirmationMessage.includes('ACCOUNT CREATED'), true, 'Confirmation message not displayed');
});

Then('the user should see an error message indicating the email is invalid', async function() {
  try {
    const errorMessage = await driver.findElement(By.xpath('//p[contains(text(), "invalid")]')).getText();
    assert.strictEqual(errorMessage.toLowerCase().includes('invalid'), true, 'Invalid email error message not displayed');
  } catch (error) {
    assert.fail('Error message for invalid email not found');
  }
});

Then('the user should see an error message indicating the password criteria', async function() {
  try {
    const errorMessage = await driver.findElement(By.xpath('//p[contains(text(), "password")]')).getText();
    assert.strictEqual(errorMessage.toLowerCase().includes('password'), true, 'Password criteria error message not displayed');
  } catch (error) {
    assert.fail('Error message for password criteria not found');
  }
});

Then('the user should see an error message indicating the email is already registered', async function() {
  try {
    const errorMessage = await driver.findElement(By.xpath('//p[contains(text(), "email") and contains(text(), "exist")]')).getText();
    assert.strictEqual(errorMessage.toLowerCase().includes('exist'), true, 'Email already registered error message not displayed');
  } catch (error) {
    assert.fail('Error message for email already registered not found');
  }
});
const { Given, When, Then } = require('cucumber');

Given('I am on the registration page', async function () {
  await browser.url('https://automationexercise.com/signup');
});

When('I enter valid user details', async function () {
  await $('#name').setValue('Test User');
  await $('#email').setValue('testuser@example.com');
  await $('#password').setValue('SecurePassword123');
});

When('I submit the registration form', async function () {
  await $('#signup-button').click();
});

Then('I should see a confirmation message', async function () {
  await expect($('#confirmation')).toBeDisplayed();
});

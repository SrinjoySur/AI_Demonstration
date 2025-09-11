const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I navigate to the Signup/Login page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('I fill out the signup form with the following details:', async function (dataTable) {
  const details = dataTable.rowsHash();
  await page.fill('input[name="name"]', details.Name);
  await page.fill('input[name="email"]', details["Email Address"]);
});

When('I click on the "Signup" button', async function () {
  await page.click('button:has-text("Signup")');
});

Then('I should see a message indicating that the registration was successful', async function () {
  const successMessage = await page.locator('text=Registration Successful');
  expect(successMessage).toBeVisible();
});
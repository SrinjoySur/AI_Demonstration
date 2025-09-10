const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Given('the signup page is displayed', async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await page.click('text=Signup / Login');
  await page.waitForSelector('form[action="/signup"]');
});

When('I enter a valid email {string}', async (email) => {
  await page.fill('input[name="email"]', email);
});

When('I click the Signup button', async () => {
  await page.click('button[type="submit"]');
});

Then('I should see the registration form', async () => {
  await page.waitForSelector('form[action="/register"]');
  await browser.close();
});

Then('I should see an error message {string}', async (message) => {
  const errorMessage = await page.textContent('.error-message');
  if (errorMessage !== message) {
    throw new Error(`Expected error message to be "${message}", but got "${errorMessage}"`);
  }
  await browser.close();
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser;
let page;

Given('the login page is displayed', async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await page.click('text=Signup / Login');
  await page.waitForSelector('form[action="/login"]');
});

When('I enter a valid username {string}', async (username) => {
  await page.fill('input[name="username"]', username);
});

When('I enter a valid password {string}', async (password) => {
  await page.fill('input[name="password"]', password);
});

When('I click the login button', async () => {
  await page.click('button[type="submit"]');
});

Then('I should be logged in successfully', async () => {
  await page.waitForSelector('#dashboard');
  await browser.close();
});

Then('I should see an error message {string}', async (message) => {
  const errorMessage = await page.textContent('.error-message');
  if (errorMessage !== message) {
    throw new Error(`Expected error message to be "${message}", but got "${errorMessage}"`);
  }
  await browser.close();
});

Then('my account should be locked', async () => {
  const lockMessage = await page.textContent('.lock-message');
  if (lockMessage !== 'Your account is locked due to multiple failed login attempts') {
    throw new Error(`Expected lock message to be "Your account is locked due to multiple failed login attempts", but got "${lockMessage}"`);
  }
  await browser.close();
});
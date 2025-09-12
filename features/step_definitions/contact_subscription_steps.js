const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const HomePage = require('../../page-objects/home-page');
const ContactPage = require('../../page-objects/contact-page');
const CartPage = require('../../page-objects/cart-page');
const { generateRandomEmail } = require('../../utils/helpers');

let homePage, contactPage, cartPage;
let testEmail;

// Reusing steps from other files
// Given('I am on the home page', async function() {...});

Given('I am on the cart page', async function() {
  homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickNavLink('Cart');
  
  cartPage = new CartPage(this.page);
  await expect(this.page).toHaveURL(/.*view_cart/);
});

When('I click on {string} link', async function(linkText) {
  await homePage.clickNavLink(linkText);
});

Then('I should be redirected to contact page', async function() {
  await expect(this.page).toHaveURL(/.*contact_us/);
  contactPage = new ContactPage(this.page);
});

When('I enter name, email, subject and message', async function() {
  testEmail = generateRandomEmail();
  await contactPage.fillContactForm({
    name: 'Test User',
    email: testEmail,
    subject: 'Test Subject',
    message: 'This is a test message for the contact form.'
  });
});

When('I upload a file', async function() {
  await contactPage.uploadFile('test-file.txt');
});

When('I click on {string} button', async function(buttonText) {
  await contactPage.clickButton(buttonText);
});

Then('I should see {string} message', async function(message) {
  await expect(this.page.locator(`text=${message}`)).toBeVisible();
});

Then('I should be redirected to home page', async function() {
  await expect(this.page).toHaveURL(/.*\/$/);
});

When('I scroll down to footer', async function() {
  if (this.page.url().includes('view_cart')) {
    await cartPage.scrollToFooter();
  } else {
    await homePage.scrollToFooter();
  }
});

When('I enter email address in subscription input', async function() {
  testEmail = generateRandomEmail();
  if (this.page.url().includes('view_cart')) {
    await cartPage.enterSubscriptionEmail(testEmail);
  } else {
    await homePage.enterSubscriptionEmail(testEmail);
  }
});

When('I click on subscription arrow button', async function() {
  if (this.page.url().includes('view_cart')) {
    await cartPage.clickSubscribeButton();
  } else {
    await homePage.clickSubscribeButton();
  }
});
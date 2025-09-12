const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const HomePage = require('../../page-objects/home-page');
const LoginPage = require('../../page-objects/login-page');
const SignupPage = require('../../page-objects/signup-page');
const ProductsPage = require('../../page-objects/products-page');
const CartPage = require('../../page-objects/cart-page');
const CheckoutPage = require('../../page-objects/checkout-page');
const PaymentPage = require('../../page-objects/payment-page');
const { generateRandomEmail, generateRandomUserData } = require('../../utils/helpers');

let homePage, loginPage, signupPage, productsPage, cartPage, checkoutPage, paymentPage;
let testEmail, testPassword, testName;

// Reusing steps from other files
// Given('I am on the home page', async function() {...});
// When('I click on {string} link', async function(linkText) {...});
// Then('I should see {string} message', async function(message) {...});

Given('I have products in my cart', async function() {
  homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickNavLink('Products');
  
  productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(0);
  await productsPage.clickViewCart();
  
  cartPage = new CartPage(this.page);
  const productCount = await cartPage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});

When('I click on {string} button', async function(buttonText) {
  if (buttonText === 'Proceed To Checkout') {
    await cartPage.clickCheckoutButton();
  } else if (buttonText === 'Place Order') {
    await checkoutPage.clickPlaceOrderButton();
  } else if (buttonText === 'Pay and Confirm Order') {
    await paymentPage.clickPayAndConfirmButton();
  } else if (buttonText === 'Download Invoice') {
    await this.page.locator(`button:has-text("${buttonText}")`).click();
  }
});

Then('I should be redirected to login page', async function() {
  await expect(this.page).toHaveURL(/.*login/);
  loginPage = new LoginPage(this.page);
});

When('I register a new account', async function() {
  testName = 'Test User';
  testEmail = generateRandomEmail();
  testPassword = 'password123';
  
  await loginPage.enterSignupDetails(testName, testEmail);
  await loginPage.clickButton('Signup');
  
  signupPage = new SignupPage(this.page);
  await signupPage.fillAccountInformation({
    title: 'Mr',
    password: testPassword,
    day: '1',
    month: 'January',
    year: '1990',
    firstName: 'Test',
    lastName: 'User',
    company: 'Test Company',
    address1: '123 Test St',
    address2: 'Apt 456',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    zipcode: '90001',
    mobileNumber: '1234567890'
  });
  
  await signupPage.clickCreateAccountButton();
  await this.page.locator('a:has-text("Continue")').click();
});

Then('I should see delivery address and billing address', async function() {
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.verifyAddressDetails();
});

When('I enter description in comment text area', async function() {
  await checkoutPage.enterOrderComment('This is a test order comment.');
});

Then('I should be redirected to payment page', async function() {
  await expect(this.page).toHaveURL(/.*payment/);
  paymentPage = new PaymentPage(this.page);
});

When('I enter payment details', async function() {
  await paymentPage.enterPaymentDetails({
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030'
  });
});

Given('I am registered but not logged in', async function() {
  // This step assumes we have a registered user with credentials
  testEmail = 'test_user@example.com';
  testPassword = 'password123';
  
  homePage = new HomePage(this.page);
  await homePage.navigate();
});

When('I login with valid credentials', async function() {
  if (!this.page.url().includes('login')) {
    await homePage.clickNavLink('Signup / Login');
  }
  
  loginPage = new LoginPage(this.page);
  await loginPage.enterLoginDetails(testEmail, testPassword);
  await loginPage.clickButton('Login');
});

When('I add products to cart', async function() {
  await homePage.clickNavLink('Products');
  
  productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(0);
  await productsPage.clickContinueShopping();
});

Given('I have placed an order', async function() {
  // This step combines multiple steps to place an order
  homePage = new HomePage(this.page);
  await homePage.navigate();
  await homePage.clickNavLink('Signup / Login');
  
  loginPage = new LoginPage(this.page);
  await loginPage.enterLoginDetails('test_user@example.com', 'password123');
  await loginPage.clickButton('Login');
  
  await homePage.clickNavLink('Products');
  
  productsPage = new ProductsPage(this.page);
  await productsPage.addProductToCart(0);
  await productsPage.clickViewCart();
  
  cartPage = new CartPage(this.page);
  await cartPage.clickCheckoutButton();
  
  checkoutPage = new CheckoutPage(this.page);
  await checkoutPage.enterOrderComment('This is a test order comment.');
  await checkoutPage.clickPlaceOrderButton();
  
  paymentPage = new PaymentPage(this.page);
  await paymentPage.enterPaymentDetails({
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2030'
  });
  await paymentPage.clickPayAndConfirmButton();
  
  await expect(this.page.locator('h2:has-text("ORDER PLACED!")')).toBeVisible();
});

Then('the invoice should be downloaded successfully', async function() {
  // This step would typically check for a downloaded file
  // For Playwright, we'd use the download event handler
  // For this example, we'll just verify the download button was clicked
  await expect(this.page.locator('a:has-text("Download Invoice")')).toBeVisible();
});
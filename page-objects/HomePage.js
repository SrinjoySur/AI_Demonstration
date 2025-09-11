const BasePage = require('./BasePage');

/**
 * Home Page Object containing selectors and methods for the home page
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.homePageLink = 'a[href="/"]';
    this.productsLink = 'a[href="/products"]';
    this.cartLink = 'a[href="/view_cart"]';
    this.loginLink = 'a[href="/login"]';
    this.contactUsLink = 'a[href="/contact_us"]';
    this.testCasesLink = 'a[href="/test_cases"]';
    this.subscriptionEmail = '#susbscribe_email';
    this.subscribeButton = '#subscribe';
    this.successMessage = '.alert-success';
    this.carouselSlider = '#slider-carousel';
    this.featuredItems = '.features_items';
    this.loggedInAs = 'a:has-text("Logged in as")';
    this.logoutLink = 'a[href="/logout"]';
    this.deleteAccountLink = 'a[href="/delete_account"]';
  }

  /**
   * Navigate to home page
   */
  async navigateToHome() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Navigate to products page
   */
  async navigateToProducts() {
    await this.clickElement(this.productsLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to cart page
   */
  async navigateToCart() {
    await this.clickElement(this.cartLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.clickElement(this.loginLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to contact us page
   */
  async navigateToContactUs() {
    await this.clickElement(this.contactUsLink);
    await this.waitForPageLoad();
  }

  /**
   * Navigate to test cases page
   */
  async navigateToTestCases() {
    await this.clickElement(this.testCasesLink);
    await this.waitForPageLoad();
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email to subscribe with
   */
  async subscribeToNewsletter(email) {
    await this.fillInput(this.subscriptionEmail, email);
    await this.clickElement(this.subscribeButton);
  }

  /**
   * Check if home page is visible
   * @returns {Promise<boolean>} - True if home page is visible
   */
  async isHomePageVisible() {
    return await this.isElementVisible(this.carouselSlider) && 
           await this.isElementVisible(this.featuredItems);
  }

  /**
   * Check if user is logged in
   * @param {string} username - Username to check
   * @returns {Promise<boolean>} - True if logged in as username
   */
  async isLoggedIn(username) {
    const loggedInText = await this.getElementText(this.loggedInAs);
    return loggedInText.includes(username);
  }

  /**
   * Logout user
   */
  async logout() {
    await this.clickElement(this.logoutLink);
    await this.waitForPageLoad();
  }

  /**
   * Delete account
   */
  async deleteAccount() {
    await this.clickElement(this.deleteAccountLink);
    await this.waitForPageLoad();
  }
}

module.exports = HomePage;
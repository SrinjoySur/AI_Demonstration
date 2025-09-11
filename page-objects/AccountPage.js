const BasePage = require('./BasePage');

/**
 * Account Page Object containing selectors and methods for account-related pages
 */
class AccountPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.signupNameInput = 'input[data-qa="signup-name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button[data-qa="signup-button"]';
    this.loginEmailInput = 'input[data-qa="login-email"]';
    this.loginPasswordInput = 'input[data-qa="login-password"]';
    this.loginButton = 'button[data-qa="login-button"]';
    this.logoutLink = 'a[href="/logout"]';
    this.deleteAccountLink = 'a[href="/delete_account"]';
    this.accountCreatedMessage = 'h2.title';
    this.accountDeletedMessage = 'h2.title';
    this.loggedInAsText = '.shop-menu .nav.navbar-nav > li:nth-child(10) a';
    this.errorMessage = '.login-form p';
    
    // Registration form selectors
    this.titleMr = '#id_gender1';
    this.titleMrs = '#id_gender2';
    this.passwordInput = '#password';
    this.daySelect = '#days';
    this.monthSelect = '#months';
    this.yearSelect = '#years';
    this.newsletterCheckbox = '#newsletter';
    this.specialOffersCheckbox = '#optin';
    this.firstNameInput = '#first_name';
    this.lastNameInput = '#last_name';
    this.companyInput = '#company';
    this.address1Input = '#address1';
    this.address2Input = '#address2';
    this.countrySelect = '#country';
    this.stateInput = '#state';
    this.cityInput = '#city';
    this.zipcodeInput = '#zipcode';
    this.mobileNumberInput = '#mobile_number';
    this.createAccountButton = 'button[data-qa="create-account"]';
    this.continueButton = 'a[data-qa="continue-button"]';
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage() {
    await this.navigate('/login');
    await this.waitForPageLoad();
  }

  /**
   * Sign up with name and email
   * @param {string} name - Name for signup
   * @param {string} email - Email for signup
   */
  async signup(name, email) {
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    await this.clickElement(this.signupButton);
    await this.waitForPageLoad();
  }

  /**
   * Login with email and password
   * @param {string} email - Email for login
   * @param {string} password - Password for login
   */
  async login(email, password) {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad();
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

  /**
   * Fill registration form
   * @param {Object} userData - User data for registration
   */
  async fillRegistrationForm(userData) {
    // Select title
    if (userData.gender === 'male') {
      await this.clickElement(this.titleMr);
    } else {
      await this.clickElement(this.titleMrs);
    }
    
    // Fill password
    await this.fillInput(this.passwordInput, userData.password);
    
    // Select date of birth
    await this.selectOption(this.daySelect, userData.day || '1');
    await this.selectOption(this.monthSelect, userData.month || 'January');
    await this.selectOption(this.yearSelect, userData.year || '1990');
    
    // Check newsletter and special offers
    if (userData.newsletter) {
      await this.clickElement(this.newsletterCheckbox);
    }
    if (userData.specialOffers) {
      await this.clickElement(this.specialOffersCheckbox);
    }
    
    // Fill address information
    await this.fillInput(this.firstNameInput, userData.firstName);
    await this.fillInput(this.lastNameInput, userData.lastName);
    await this.fillInput(this.companyInput, userData.company);
    await this.fillInput(this.address1Input, userData.address1);
    await this.fillInput(this.address2Input, userData.address2);
    await this.selectOption(this.countrySelect, userData.country);
    await this.fillInput(this.stateInput, userData.state);
    await this.fillInput(this.cityInput, userData.city);
    await this.fillInput(this.zipcodeInput, userData.zipcode);
    await this.fillInput(this.mobileNumberInput, userData.mobileNumber);
    
    // Create account
    await this.clickElement(this.createAccountButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if user is logged in
   * @param {string} username - Username to check
   * @returns {Promise<boolean>} - True if logged in as username
   */
  async isLoggedIn(username) {
    const loggedInText = await this.getElementText(this.loggedInAsText);
    return loggedInText.includes(username);
  }

  /**
   * Check if account created message is visible
   * @returns {Promise<boolean>} - True if account created message is visible
   */
  async isAccountCreatedMessageVisible() {
    const message = await this.getElementText(this.accountCreatedMessage);
    return message.includes('ACCOUNT CREATED');
  }

  /**
   * Check if account deleted message is visible
   * @returns {Promise<boolean>} - True if account deleted message is visible
   */
  async isAccountDeletedMessageVisible() {
    const message = await this.getElementText(this.accountDeletedMessage);
    return message.includes('ACCOUNT DELETED');
  }

  /**
   * Continue to dashboard after account creation
   */
  async continueToDashboard() {
    await this.clickElement(this.continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Get error message
   * @returns {Promise<string>} - Error message text
   */
  async getErrorMessage() {
    return await this.getElementText(this.errorMessage);
  }
}

module.exports = AccountPage;
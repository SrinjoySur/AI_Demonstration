/**
 * Base Page Object that provides common functionality for all page objects
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://automationexercise.com';
  }

  /**
   * Navigate to a specific path
   * @param {string} path - Path to navigate to
   */
  async navigate(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get text content of an element
   * @param {string} selector - Element selector
   * @returns {Promise<string>} - Text content
   */
  async getElementText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - True if visible
   */
  async isElementVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Click on an element
   * @param {string} selector - Element selector
   */
  async clickElement(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill input field
   * @param {string} selector - Element selector
   * @param {string} value - Value to fill
   */
  async fillInput(selector, value) {
    await this.page.fill(selector, value);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - Element selector
   * @param {string} value - Value to select
   */
  async selectOption(selector, value) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Get page title
   * @returns {Promise<string>} - Page title
   */
  async getPageTitle() {
    return await this.page.title();
  }
}

module.exports = BasePage;
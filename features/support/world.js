const { setWorldConstructor } = require('@cucumber/cucumber');
const puppeteer = require('puppeteer');
const HomePage = require('../page_objects/home_page');

/**
 * Custom world class for Cucumber tests
 */
class CustomWorld {
  /**
   * Constructor for the CustomWorld class
   * @param {Object} options - Cucumber world options
   */
  constructor(options) {
    this.options = options;
    this.browser = null;
    this.page = null;
    this.homePage = null;
  }

  /**
   * Initialize browser and page
   * @returns {Promise<void>}
   */
  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu'
      ]
    });
    this.page = await this.browser.newPage();
    
    // Set default viewport
    await this.page.setViewport({ width: 1366, height: 768 });
    
    // Initialize page objects
    this.homePage = new HomePage(this.page);
  }

  /**
   * Close browser
   * @returns {Promise<void>}
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Set the custom world class
setWorldConstructor(CustomWorld);

module.exports = CustomWorld;
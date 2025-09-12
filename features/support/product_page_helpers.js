/**
 * Helper functions for product page edge case testing
 */

/**
 * Generates a string of specified length
 * @param {number} length - The length of the string to generate
 * @param {string} char - The character to repeat (default: 'a')
 * @returns {string} - The generated string
 */
function generateString(length, char = 'a') {
  return char.repeat(length);
}

/**
 * Waits for a specified time
 * @param {number} ms - The time to wait in milliseconds
 * @returns {Promise} - A promise that resolves after the specified time
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Checks if an element is in the viewport
 * @param {Object} page - The Playwright page object
 * @param {string} selector - The selector for the element to check
 * @returns {Promise<boolean>} - A promise that resolves to true if the element is in the viewport
 */
async function isElementInViewport(page, selector) {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Scrolls to an element
 * @param {Object} page - The Playwright page object
 * @param {string} selector - The selector for the element to scroll to
 * @returns {Promise<void>} - A promise that resolves when the element is scrolled into view
 */
async function scrollToElement(page, selector) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
}

/**
 * Gets the count of products on the page
 * @param {Object} page - The Playwright page object
 * @returns {Promise<number>} - A promise that resolves to the number of products
 */
async function getProductCount(page) {
  return page.$$eval('.product-image-wrapper', elements => elements.length);
}

/**
 * Gets the text of all product names on the page
 * @param {Object} page - The Playwright page object
 * @returns {Promise<string[]>} - A promise that resolves to an array of product names
 */
async function getProductNames(page) {
  return page.$$eval('.productinfo p', elements => elements.map(el => el.textContent.trim()));
}

/**
 * Gets the text of all product prices on the page
 * @param {Object} page - The Playwright page object
 * @returns {Promise<string[]>} - A promise that resolves to an array of product prices
 */
async function getProductPrices(page) {
  return page.$$eval('.productinfo h2', elements => elements.map(el => el.textContent.trim()));
}

module.exports = {
  generateString,
  wait,
  isElementInViewport,
  scrollToElement,
  getProductCount,
  getProductNames,
  getProductPrices
};
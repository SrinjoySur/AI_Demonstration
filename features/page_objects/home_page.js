/**
 * Page Object for the Automation Exercise Home Page
 */
class HomePage {
  /**
   * Constructor for the HomePage class
   * @param {Object} page - Puppeteer page object
   */
  constructor(page) {
    this.page = page;
    this.url = 'https://automationexercise.com/';
    
    // Selectors
    this.selectors = {
      // Navigation
      navbar: '.navbar',
      navbarLinks: '.navbar-nav li a',
      categoryNavigation: '.left-sidebar h2',
      womenCategory: '.category-products .panel:nth-child(1)',
      menCategory: '.category-products .panel:nth-child(2)',
      kidsCategory: '.category-products .panel:nth-child(3)',
      
      // Products
      featuredItems: '.features_items',
      productContainer: '.product-image-wrapper',
      productImage: '.productinfo img',
      productName: '.productinfo h2',
      productPrice: '.productinfo h2',
      addToCartButton: '.add-to-cart',
      viewProductLink: '.choose a',
      
      // Search
      searchBox: '.search_box',
      searchButton: '.search_box + button',
      
      // Subscription
      subscriptionEmail: '#susbscribe_email',
      subscriptionButton: '#subscribe',
      subscriptionSuccess: '.alert-success',
      
      // Footer
      footer: '.footer',
      
      // Cart
      cartLink: '.shop-menu .nav li:nth-child(3) a',
      
      // Recommended items
      recommendedItems: '#recommended-item-carousel'
    };
  }

  /**
   * Navigate to the home page
   * @param {Object} options - Navigation options
   * @returns {Promise<void>}
   */
  async navigate(options = { waitUntil: 'networkidle0' }) {
    await this.page.goto(this.url, options);
  }

  /**
   * Set viewport size
   * @param {number} width - Viewport width
   * @param {number} height - Viewport height
   * @returns {Promise<void>}
   */
  async setViewport(width, height) {
    await this.page.setViewport({ width, height });
  }

  /**
   * Search for a product
   * @param {string} query - Search query
   * @returns {Promise<void>}
   */
  async search(query) {
    await this.page.type(this.selectors.searchBox, query);
    await this.page.click(this.selectors.searchButton);
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
  }

  /**
   * Add a product to cart
   * @param {number} index - Product index (0-based)
   * @returns {Promise<void>}
   */
  async addProductToCart(index = 0) {
    const products = await this.page.$$(this.selectors.productContainer);
    if (products.length <= index) {
      throw new Error(`Product at index ${index} not found`);
    }
    
    // Hover over the product to show the add to cart button
    await products[index].hover();
    
    // Get the add to cart button for this product
    const addToCartButton = await products[index].$(this.selectors.addToCartButton);
    await addToCartButton.click();
    
    // Wait for the modal to appear
    await this.page.waitForSelector('.modal-content', { visible: true });
  }

  /**
   * View product details
   * @param {number} index - Product index (0-based)
   * @returns {Promise<void>}
   */
  async viewProductDetails(index = 0) {
    const viewLinks = await this.page.$$(this.selectors.viewProductLink);
    if (viewLinks.length <= index) {
      throw new Error(`View product link at index ${index} not found`);
    }
    
    await viewLinks[index].click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle0' });
  }

  /**
   * Subscribe to newsletter
   * @param {string} email - Email address
   * @returns {Promise<boolean>} - Whether subscription was successful
   */
  async subscribe(email) {
    await this.page.type(this.selectors.subscriptionEmail, email);
    await this.page.click(this.selectors.subscriptionButton);
    
    try {
      await this.page.waitForSelector(this.selectors.subscriptionSuccess, { 
        visible: true,
        timeout: 5000
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if element is visible
   * @param {string} selector - Element selector
   * @returns {Promise<boolean>} - Whether element is visible
   */
  async isElementVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { 
        visible: true,
        timeout: 5000
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get count of products displayed
   * @returns {Promise<number>} - Number of products
   */
  async getProductCount() {
    const products = await this.page.$$(this.selectors.productContainer);
    return products.length;
  }

  /**
   * Scroll to bottom of page
   * @returns {Promise<void>}
   */
  async scrollToBottom() {
    await this.page.evaluate(async () => {
      await new Promise(resolve => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          
          if(totalHeight >= scrollHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Wait for any lazy-loaded content
    await this.page.waitForTimeout(2000);
  }

  /**
   * Get performance metrics
   * @returns {Promise<Object>} - Performance metrics
   */
  async getPerformanceMetrics() {
    return await this.page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const resources = performance.getEntriesByType('resource');
      
      return {
        navigationTiming: {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          load: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        },
        resourceStats: {
          totalResources: resources.length,
          totalSize: resources.reduce((total, resource) => total + (resource.transferSize || 0), 0),
          cachedResources: resources.filter(resource => resource.transferSize === 0).length
        }
      };
    });
  }
}

module.exports = HomePage;
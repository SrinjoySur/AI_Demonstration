const BasePage = require('./BasePage');

/**
 * Products Page Object containing selectors and methods for the products page
 */
class ProductsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.allProductsTitle = '.title';
    this.productList = '.features_items .col-sm-4';
    this.searchInput = '#search_product';
    this.searchButton = '#submit_search';
    this.viewProductButtons = '.choose a';
    this.addToCartButtons = '.add-to-cart';
    this.continueShoppingButton = '.modal-footer button';
    this.viewCartLink = 'p a[href="/view_cart"]';
    this.productName = '.product-information h2';
    this.productCategory = '.product-information p:nth-child(3)';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:nth-child(6)';
    this.productCondition = '.product-information p:nth-child(7)';
    this.productBrand = '.product-information p:nth-child(8)';
    this.quantityInput = '#quantity';
    this.productAddToCartButton = '.cart button';
    this.productImage = '.view-product img';
    this.categoryProducts = '.category-products';
    this.brands = '.brands_products';
    this.categoryList = '.category-products .panel-title a';
    this.brandList = '.brands-name .nav.nav-pills.nav-stacked li a';
    this.searchedProductsTitle = '.title.text-center';
  }

  /**
   * Navigate to products page
   */
  async navigateToProductsPage() {
    await this.navigate('/products');
    await this.waitForPageLoad();
  }

  /**
   * Search for a product
   * @param {string} productName - Product name to search for
   */
  async searchProduct(productName) {
    await this.fillInput(this.searchInput, productName);
    await this.clickElement(this.searchButton);
    await this.waitForPageLoad();
  }

  /**
   * View product details
   * @param {number} productIndex - Index of product to view (0-based)
   */
  async viewProductDetails(productIndex = 0) {
    const viewProductButtons = await this.page.$$(this.viewProductButtons);
    if (viewProductButtons.length > productIndex) {
      await viewProductButtons[productIndex].click();
      await this.waitForPageLoad();
    } else {
      throw new Error(`Product at index ${productIndex} not found`);
    }
  }

  /**
   * Add product to cart
   * @param {number} productIndex - Index of product to add to cart (0-based)
   */
  async addProductToCart(productIndex = 0) {
    // Need to hover over product to make add to cart button visible
    const products = await this.page.$$(this.productList);
    if (products.length > productIndex) {
      await products[productIndex].hover();
      
      const addToCartButtons = await this.page.$$(this.addToCartButtons);
      await addToCartButtons[productIndex].click();
      
      // Wait for modal to appear
      await this.page.waitForSelector(this.continueShoppingButton, { state: 'visible' });
    } else {
      throw new Error(`Product at index ${productIndex} not found`);
    }
  }

  /**
   * Continue shopping after adding product to cart
   */
  async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
  }

  /**
   * View cart after adding product
   */
  async viewCart() {
    await this.clickElement(this.viewCartLink);
    await this.waitForPageLoad();
  }

  /**
   * Filter products by category
   * @param {string} category - Category to filter by
   */
  async filterByCategory(category) {
    const categorySelector = `${this.categoryList}:has-text("${category}")`;
    await this.clickElement(categorySelector);
    await this.waitForPageLoad();
  }

  /**
   * Filter products by brand
   * @param {string} brand - Brand to filter by
   */
  async filterByBrand(brand) {
    const brandSelector = `${this.brandList}:has-text("${brand}")`;
    await this.clickElement(brandSelector);
    await this.waitForPageLoad();
  }

  /**
   * Get number of products displayed
   * @returns {Promise<number>} - Number of products
   */
  async getProductCount() {
    const products = await this.page.$$(this.productList);
    return products.length;
  }

  /**
   * Check if search results are displayed
   * @returns {Promise<boolean>} - True if search results are displayed
   */
  async isSearchResultsDisplayed() {
    const title = await this.getElementText(this.searchedProductsTitle);
    return title.includes('SEARCHED PRODUCTS');
  }

  /**
   * Get product details
   * @returns {Promise<Object>} - Product details
   */
  async getProductDetails() {
    const name = await this.getElementText(this.productName);
    const category = await this.getElementText(this.productCategory);
    const price = await this.getElementText(this.productPrice);
    const availability = await this.getElementText(this.productAvailability);
    const condition = await this.getElementText(this.productCondition);
    const brand = await this.getElementText(this.productBrand);
    
    return {
      name,
      category: category.replace('Category: ', ''),
      price: price.replace('Rs. ', ''),
      availability: availability.replace('Availability: ', ''),
      condition: condition.replace('Condition: ', ''),
      brand: brand.replace('Brand: ', '')
    };
  }
}

module.exports = ProductsPage;
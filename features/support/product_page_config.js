/**
 * Configuration for product page edge case testing
 */

module.exports = {
  // Base URL for the application
  baseUrl: 'https://automationexercise.com',
  
  // Timeouts
  timeouts: {
    defaultTimeout: 30000, // 30 seconds
    navigationTimeout: 60000, // 60 seconds
  },
  
  // Test data
  testData: {
    // Valid search terms
    validSearchTerms: ['dress', 'top', 'men', 'women'],
    
    // Invalid search terms
    invalidSearchTerms: ['nonexistentproduct12345', '!@#$%^&*()'],
    
    // Long search term
    longSearchTerm: 'a'.repeat(100),
    
    // Categories
    categories: ['Women', 'Men', 'Kids'],
    
    // Brands
    brands: ['Polo', 'H&M', 'Madame', 'Mast & Harbour', 'Babyhug', 'Allen Solly Junior'],
  },
  
  // Selectors
  selectors: {
    // Search
    searchBox: '[name="search"]',
    searchButton: '#submit_search',
    searchResults: '.features_items',
    
    // Categories
    categorySection: '.left-sidebar .category-products',
    
    // Brands
    brandSection: '.left-sidebar .brands_products',
    
    // Products
    productCard: '.product-image-wrapper',
    productInfo: '.productinfo',
    productName: '.productinfo p',
    productPrice: '.productinfo h2',
    productImage: '.productinfo img',
    
    // Buttons
    viewProductButton: '.choose a',
    addToCartButton: '.add-to-cart',
    
    // Pagination
    pagination: '.pagination',
    
    // Cart
    cartLink: '.shop-menu .nav li:nth-child(3) a',
    cartTable: '#cart_info',
    cartQuantity: '.cart_quantity button',
    cartPrice: '.cart_price p',
    cartTotal: '.cart_total_price',
  }
};
const BasePage = require('./BasePage');

/**
 * Cart Page Object containing selectors and methods for the cart page
 */
class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.cartTable = '#cart_info_table';
    this.cartItems = '#cart_info_table tbody tr';
    this.cartItemNames = '.cart_description h4 a';
    this.cartItemPrices = '.cart_price p';
    this.cartItemQuantities = '.cart_quantity_input';
    this.cartItemTotals = '.cart_total_price';
    this.cartItemRemoveButtons = '.cart_quantity_delete';
    this.emptyCartMessage = '#empty_cart';
    this.proceedToCheckoutButton = '.check_out';
    this.continueShoppingButton = '.btn.btn-primary';
    this.registerLoginLink = '.modal-body p a';
  }

  /**
   * Navigate to cart page
   */
  async navigateToCartPage() {
    await this.navigate('/view_cart');
    await this.waitForPageLoad();
  }

  /**
   * Get number of items in cart
   * @returns {Promise<number>} - Number of items in cart
   */
  async getCartItemCount() {
    const items = await this.page.$$(this.cartItems);
    return items.length;
  }

  /**
   * Check if cart is empty
   * @returns {Promise<boolean>} - True if cart is empty
   */
  async isCartEmpty() {
    return await this.isElementVisible(this.emptyCartMessage);
  }

  /**
   * Get cart item details
   * @param {number} index - Index of item in cart (0-based)
   * @returns {Promise<Object>} - Item details
   */
  async getCartItemDetails(index = 0) {
    const names = await this.page.$$(this.cartItemNames);
    const prices = await this.page.$$(this.cartItemPrices);
    const quantities = await this.page.$$(this.cartItemQuantities);
    const totals = await this.page.$$(this.cartItemTotals);
    
    if (names.length > index) {
      const name = await names[index].textContent();
      const price = await prices[index].textContent();
      const quantity = await quantities[index].inputValue();
      const total = await totals[index].textContent();
      
      return {
        name,
        price: price.replace('Rs. ', ''),
        quantity,
        total: total.replace('Rs. ', '')
      };
    } else {
      throw new Error(`Cart item at index ${index} not found`);
    }
  }

  /**
   * Update cart item quantity
   * @param {number} index - Index of item in cart (0-based)
   * @param {number} quantity - New quantity
   */
  async updateCartItemQuantity(index = 0, quantity) {
    const quantities = await this.page.$$(this.cartItemQuantities);
    if (quantities.length > index) {
      await quantities[index].fill(quantity.toString());
    } else {
      throw new Error(`Cart item at index ${index} not found`);
    }
  }

  /**
   * Remove item from cart
   * @param {number} index - Index of item in cart (0-based)
   */
  async removeCartItem(index = 0) {
    const removeButtons = await this.page.$$(this.cartItemRemoveButtons);
    if (removeButtons.length > index) {
      await removeButtons[index].click();
      await this.waitForPageLoad();
    } else {
      throw new Error(`Cart item at index ${index} not found`);
    }
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.clickElement(this.proceedToCheckoutButton);
    await this.waitForPageLoad();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.clickElement(this.continueShoppingButton);
    await this.waitForPageLoad();
  }

  /**
   * Click register/login link in modal
   */
  async clickRegisterLoginLink() {
    await this.clickElement(this.registerLoginLink);
    await this.waitForPageLoad();
  }
}

module.exports = CartPage;
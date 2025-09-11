const BasePage = require('./BasePage');

/**
 * Checkout Page Object containing selectors and methods for the checkout page
 */
class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);
    
    // Selectors
    this.addressDetailsSection = '#address_delivery';
    this.billingAddressSection = '#address_invoice';
    this.orderReviewSection = '#cart_info';
    this.orderReviewItems = '#cart_info tbody tr';
    this.orderReviewItemNames = '.cart_description h4 a';
    this.orderReviewItemPrices = '.cart_price p';
    this.orderReviewItemQuantities = '.cart_quantity p';
    this.orderReviewItemTotals = '.cart_total_price';
    this.commentTextarea = 'textarea[name="message"]';
    this.placeOrderButton = '.btn.btn-default.check_out';
    
    // Payment page selectors
    this.nameOnCardInput = 'input[name="name_on_card"]';
    this.cardNumberInput = 'input[name="card_number"]';
    this.cvcInput = 'input[name="cvc"]';
    this.expiryMonthInput = 'input[name="expiry_month"]';
    this.expiryYearInput = 'input[name="expiry_year"]';
    this.payAndConfirmOrderButton = '#submit';
    this.successMessage = '.alert-success';
    this.downloadInvoiceButton = '.btn.btn-default.check_out';
    this.continueButton = '.btn.btn-primary';
  }

  /**
   * Add comment to order
   * @param {string} comment - Comment to add
   */
  async addComment(comment) {
    await this.fillInput(this.commentTextarea, comment);
  }

  /**
   * Place order
   */
  async placeOrder() {
    await this.clickElement(this.placeOrderButton);
    await this.waitForPageLoad();
  }

  /**
   * Fill payment details
   * @param {Object} paymentDetails - Payment details
   */
  async fillPaymentDetails(paymentDetails) {
    await this.fillInput(this.nameOnCardInput, paymentDetails.nameOnCard);
    await this.fillInput(this.cardNumberInput, paymentDetails.cardNumber);
    await this.fillInput(this.cvcInput, paymentDetails.cvc);
    await this.fillInput(this.expiryMonthInput, paymentDetails.expiryMonth);
    await this.fillInput(this.expiryYearInput, paymentDetails.expiryYear);
  }

  /**
   * Pay and confirm order
   */
  async payAndConfirmOrder() {
    await this.clickElement(this.payAndConfirmOrderButton);
    await this.waitForPageLoad();
  }

  /**
   * Check if order placed successfully
   * @returns {Promise<boolean>} - True if order placed successfully
   */
  async isOrderPlacedSuccessfully() {
    const message = await this.getElementText(this.successMessage);
    return message.includes('Your order has been placed successfully');
  }

  /**
   * Download invoice
   */
  async downloadInvoice() {
    // Setup download listener
    const downloadPromise = this.page.waitForEvent('download');
    
    await this.clickElement(this.downloadInvoiceButton);
    
    const download = await downloadPromise;
    return download;
  }

  /**
   * Continue after order
   */
  async continueAfterOrder() {
    await this.clickElement(this.continueButton);
    await this.waitForPageLoad();
  }

  /**
   * Get delivery address details
   * @returns {Promise<Object>} - Address details
   */
  async getDeliveryAddressDetails() {
    const addressText = await this.getElementText(this.addressDetailsSection);
    return this.parseAddressText(addressText);
  }

  /**
   * Get billing address details
   * @returns {Promise<Object>} - Address details
   */
  async getBillingAddressDetails() {
    const addressText = await this.getElementText(this.billingAddressSection);
    return this.parseAddressText(addressText);
  }

  /**
   * Parse address text into structured object
   * @param {string} addressText - Address text
   * @returns {Object} - Structured address
   * @private
   */
  parseAddressText(addressText) {
    const lines = addressText.split('\n').filter(line => line.trim() !== '');
    
    // Basic parsing - this would need to be adjusted based on actual format
    return {
      title: lines[0],
      name: lines[1],
      company: lines[2],
      address1: lines[3],
      address2: lines[4],
      city: lines[5],
      country: lines[6],
      phone: lines[7]
    };
  }

  /**
   * Get order review items
   * @returns {Promise<Array<Object>>} - Order items
   */
  async getOrderReviewItems() {
    const items = [];
    const rows = await this.page.$$(this.orderReviewItems);
    
    for (let i = 0; i < rows.length; i++) {
      const nameElement = await rows[i].$('.cart_description h4 a');
      const priceElement = await rows[i].$('.cart_price p');
      const quantityElement = await rows[i].$('.cart_quantity p');
      const totalElement = await rows[i].$('.cart_total_price');
      
      if (nameElement && priceElement && quantityElement && totalElement) {
        const name = await nameElement.textContent();
        const price = await priceElement.textContent();
        const quantity = await quantityElement.textContent();
        const total = await totalElement.textContent();
        
        items.push({
          name,
          price: price.replace('Rs. ', ''),
          quantity,
          total: total.replace('Rs. ', '')
        });
      }
    }
    
    return items;
  }
}

module.exports = CheckoutPage;
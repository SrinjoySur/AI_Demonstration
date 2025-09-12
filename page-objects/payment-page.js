class PaymentPage {
  constructor(page) {
    this.page = page;
    this.nameOnCardInput = page.locator('input[name="name_on_card"]');
    this.cardNumberInput = page.locator('input[name="card_number"]');
    this.cvcInput = page.locator('input[name="cvc"]');
    this.expiryMonthInput = page.locator('input[name="expiry_month"]');
    this.expiryYearInput = page.locator('input[name="expiry_year"]');
    this.payAndConfirmButton = page.locator('#submit');
    this.orderPlacedMessage = page.locator('h2:has-text("ORDER PLACED!")');
    this.confirmationMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    this.downloadInvoiceButton = page.locator('a:has-text("Download Invoice")');
  }

  async enterPaymentDetails(paymentDetails) {
    await this.nameOnCardInput.fill(paymentDetails.nameOnCard);
    await this.cardNumberInput.fill(paymentDetails.cardNumber);
    await this.cvcInput.fill(paymentDetails.cvc);
    await this.expiryMonthInput.fill(paymentDetails.expiryMonth);
    await this.expiryYearInput.fill(paymentDetails.expiryYear);
  }

  async clickPayAndConfirmButton() {
    await this.payAndConfirmButton.click();
  }

  async verifyOrderPlaced() {
    await this.orderPlacedMessage.waitFor({ state: 'visible' });
    await this.confirmationMessage.waitFor({ state: 'visible' });
  }

  async clickDownloadInvoiceButton() {
    await this.downloadInvoiceButton.click();
  }
}

module.exports = PaymentPage;
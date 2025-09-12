class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressDetails = page.locator('#address_delivery');
    this.billingDetails = page.locator('#address_invoice');
    this.commentTextarea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a.check_out');
  }

  async verifyAddressDetails() {
    await this.addressDetails.waitFor({ state: 'visible' });
    await this.billingDetails.waitFor({ state: 'visible' });
    
    // Verify that address details are displayed
    const deliveryAddressVisible = await this.addressDetails.isVisible();
    const billingAddressVisible = await this.billingDetails.isVisible();
    
    if (!deliveryAddressVisible || !billingAddressVisible) {
      throw new Error('Address details are not displayed correctly');
    }
  }

  async enterOrderComment(comment) {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }
}

module.exports = CheckoutPage;
class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProducts = page.locator('#cart_info tbody tr');
    this.removeButtons = page.locator('.cart_quantity_delete');
    this.checkoutButton = page.locator('.check_out');
    this.continueShoppingButton = page.locator('.btn.btn-default.check_out');
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.footer = page.locator('#footer');
  }

  async getProductCount() {
    return await this.cartProducts.count();
  }

  async removeProduct(index) {
    const removeButtons = await this.removeButtons.all();
    if (index < removeButtons.length) {
      await removeButtons[index].click();
    }
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async enterSubscriptionEmail(email) {
    await this.subscriptionEmail.fill(email);
  }

  async clickSubscribeButton() {
    await this.subscribeButton.click();
  }
}

module.exports = CartPage;
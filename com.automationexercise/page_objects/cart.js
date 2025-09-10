// Cart Page Object

class Cart {
  constructor(page) {
    this.page = page;
  }

  async addItem(itemId) {
    await this.page.click(`#add-to-cart-${itemId}`);
  }

  async removeItem(itemId) {
    await this.page.click(`#remove-from-cart-${itemId}`);
  }

  async viewCart() {
    await this.page.click('#view-cart');
  }
}

module.exports = Cart;
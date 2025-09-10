class Cart {
    constructor(page) {
        this.page = page;
    }

    async addItem(itemId) {
        await this.page.click(`#addItem-${itemId}`);
    }

    async removeItem(itemId) {
        await this.page.click(`#removeItem-${itemId}`);
    }

    async viewCart() {
        await this.page.click('#viewCartButton');
    }
}

module.exports = Cart;
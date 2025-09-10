const { Given, When, Then } = require('@cucumber/cucumber');
const Cart = require('../../page_objects/cart');

Given('I am on the product page', async function () {
    await this.page.goto('https://example.com/products');
});

When('I add item {string} to the cart', async function (itemId) {
    const cart = new Cart(this.page);
    await cart.addItem(itemId);
});

Then('I should see item {string} in the cart', async function (itemId) {
    await this.page.click('#viewCartButton');
    const cartItem = await this.page.$(`#cartItem-${itemId}`);
    expect(cartItem).toBeVisible();
});
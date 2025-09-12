class HomePage {
  constructor(page) {
    this.page = page;
    this.navLinks = {
      'Home': page.locator('a[href="/"]'),
      'Products': page.locator('a[href="/products"]'),
      'Cart': page.locator('a[href="/view_cart"]'),
      'Signup / Login': page.locator('a[href="/login"]'),
      'Contact us': page.locator('a[href="/contact_us"]'),
      'Logout': page.locator('a[href="/logout"]')
    };
    this.subscriptionEmail = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.footer = page.locator('#footer');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async clickNavLink(linkText) {
    await this.navLinks[linkText].click();
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

module.exports = HomePage;
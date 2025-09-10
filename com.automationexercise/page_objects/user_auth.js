// User Authentication Page Object

class UserAuth {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    await this.page.fill('#username', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async logout() {
    await this.page.click('#logout-button');
  }
}

module.exports = UserAuth;
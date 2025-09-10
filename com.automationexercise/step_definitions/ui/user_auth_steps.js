const { Given, When, Then } = require('@cucumber/cucumber');
const UserAuth = require('../../page_objects/user_auth');

Given('I am on the login page', async function () {
    await this.page.goto('https://example.com/login');
});

When('I login with username {string} and password {string}', async function (username, password) {
    const userAuth = new UserAuth(this.page);
    await userAuth.login(username, password);
});

Then('I should see the logout button', async function () {
    const logoutButton = await this.page.$('#logoutButton');
    expect(logoutButton).toBeVisible();
});
Given('I navigate to the Signup/Login page', async function () {
  await page.goto('https://automationexercise.com/login');
});

When('I fill out the login form with the following details:', async function (dataTable) {
  const details = dataTable.rowsHash();
  await page.fill('input[name="email"]', details["Email Address"]);
  await page.fill('input[name="password"]', details.Password);
});

When('I click on the "Login" button', async function () {
  await page.click('button:has-text("Login")');
});

Then('I should see a message indicating that the login was successful', async function () {
  const successMessage = await page.locator('text=Login Successful');
  expect(successMessage).toBeVisible();
});
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I scroll down to the footer', async function() {
  // Scroll to the footer section
  await this.page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });
  
  // Verify the subscription section is visible
  await expect(this.page.locator('#footer')).toBeVisible();
});

When('I enter my email address {string} in the subscription input', async function(email) {
  // Fill in the email input field
  await this.page.fill('#susbscribe_email', email);
});

When('I click the arrow button', async function() {
  // Click the subscribe button
  await this.page.click('#subscribe');
});

Then('I should see an error message about invalid email format', async function() {
  // Check for error message - the exact message may vary
  // This uses a partial match approach
  await expect(this.page.locator('text=/invalid.*email/i')).toBeVisible();
});

Given('I have already subscribed with email {string}', async function(email) {
  // This is a precondition that assumes the email is already subscribed
  // We'll subscribe the email first to ensure this condition is met
  
  await this.page.evaluate(() => {
    document.querySelector('footer').scrollIntoView();
  });
  
  await this.page.fill('#susbscribe_email', email);
  await this.page.click('#subscribe');
  
  // Wait for subscription to complete
  await this.page.waitForSelector('text=You have been successfully subscribed!');
  
  // Refresh the page to start fresh
  await this.page.reload();
});
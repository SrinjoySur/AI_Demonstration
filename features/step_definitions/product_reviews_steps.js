const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

When('I click on the first product\'s {string} button', async function(buttonText) {
  // Find the first product and click its button
  await this.page.locator('.product-image-wrapper').first().locator(`text=${buttonText}`).click();
});

Then('I should see the {string} section', async function(sectionTitle) {
  // Verify the section is visible
  await expect(this.page.locator(`h2:has-text("${sectionTitle}")`)).toBeVisible();
});

Then('I should see any existing reviews for the product', async function() {
  // Check if reviews section exists
  const reviewsSection = this.page.locator('.reviews');
  
  // If there are reviews, verify they're visible
  // If not, this step passes anyway (as "any" includes zero)
  if (await reviewsSection.count() > 0) {
    await expect(reviewsSection).toBeVisible();
  }
});

When('I enter my name {string} in the review form', async function(name) {
  await this.page.fill('#name', name);
});

When('I enter my email {string} in the review form', async function(email) {
  await this.page.fill('#email', email);
});

When('I enter {string} as my review', async function(reviewText) {
  await this.page.fill('#review', reviewText);
});

When('I click {string} review button', async function(buttonText) {
  await this.page.click(`button:has-text("${buttonText}")`);
});

Then('I should see {string} message', async function(message) {
  await expect(this.page.locator(`text=${message}`)).toBeVisible();
});

When('I filter reviews by {string} rating', async function(rating) {
  // This step assumes there's a filter dropdown or buttons for ratings
  // Adjust the selector based on the actual implementation
  await this.page.click(`button:has-text("${rating}")`);
});

Then('I should only see reviews with {string} rating', async function(rating) {
  // Get all visible reviews
  const reviews = this.page.locator('.review-item');
  
  // Check the count
  const count = await reviews.count();
  
  // If there are reviews, verify they all have the specified rating
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const reviewRating = await reviews.nth(i).locator('.rating').textContent();
      expect(reviewRating).toContain(rating);
    }
  }
});

When('I sort reviews by {string}', async function(sortOption) {
  // This step assumes there's a sort dropdown or buttons
  // Adjust the selector based on the actual implementation
  await this.page.selectOption('.sort-reviews', sortOption);
});

Then('I should see reviews in descending order of date', async function() {
  // Get all review dates
  const reviewDates = await this.page.locator('.review-date').allTextContents();
  
  // Convert text dates to Date objects
  const dates = reviewDates.map(dateText => new Date(dateText));
  
  // Check if dates are in descending order
  for (let i = 0; i < dates.length - 1; i++) {
    expect(dates[i] >= dates[i + 1]).toBeTruthy();
  }
});
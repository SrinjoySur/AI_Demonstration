Feature: Product Reviews
  As a customer
  I want to view and write product reviews
  So that I can share my experience and read others' opinions

  Background:
    Given I am on the Automation Exercise homepage

  Scenario: View Product Reviews
    When I click on "Products" button
    And I click on the first product's "View Product" button
    Then I should see the "Write Your Review" section
    And I should see any existing reviews for the product

  Scenario: Submit a Product Review as Guest
    When I click on "Products" button
    And I click on the first product's "View Product" button
    And I enter my name "John Doe" in the review form
    And I enter my email "john.doe@example.com" in the review form
    And I enter "Great product! Highly recommended." as my review
    And I click "Submit" review button
    Then I should see "Thank you for your review" message

  Scenario: Submit a Product Review as Logged In User
    Given I am logged in with valid credentials
    When I click on "Products" button
    And I click on the first product's "View Product" button
    And I enter "This product exceeded my expectations. The quality is excellent." as my review
    And I click "Submit" review button
    Then I should see "Thank you for your review" message

  Scenario: Filter Reviews by Rating
    When I click on "Products" button
    And I click on the first product's "View Product" button
    And I filter reviews by "5 stars" rating
    Then I should only see reviews with "5 stars" rating

  Scenario: Sort Reviews by Date
    When I click on "Products" button
    And I click on the first product's "View Product" button
    And I sort reviews by "Most Recent"
    Then I should see reviews in descending order of date
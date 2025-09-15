Feature: Product Reviews
  As a user
  I want to read and write product reviews
  So that I can make informed purchasing decisions

  Background:
    Given I am on the AutomationExercise website

  @reviews
  Scenario: User can add a review to a product
    Given I am on a product detail page
    When I scroll to the review section
    And I fill in the review form:
      | name    | John Reviewer           |
      | email   | reviewer@example.com    |
      | review  | Great product quality!  |
    And I click submit review
    Then I should see success message "Thank you for your review."

  @reviews @negative
  Scenario: Review form validation
    Given I am on a product detail page
    When I try to submit review without required fields
    Then I should see validation errors

Feature: Newsletter Subscription
  As a user
  I want to subscribe to newsletter
  So that I can receive updates about new products

  Background:
    Given I am on the AutomationExercise website

  @subscription
  Scenario: User can subscribe to newsletter from home page
    Given I am on the home page
    When I scroll to the subscription section
    And I enter email "subscriber@example.com"
    And I click subscribe
    Then I should see success message "You have been successfully subscribed!"

  @subscription
  Scenario: User can subscribe to newsletter from cart page
    Given I am on the cart page
    When I scroll to the subscription section
    And I enter email "subscriber@example.com"
    And I click subscribe
    Then I should see success message "You have been successfully subscribed!"

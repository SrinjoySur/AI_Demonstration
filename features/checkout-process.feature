Feature: Checkout Process
  As a user
  I want to complete my purchase
  So that I can buy the products in my cart

  Background:
    Given I am on the AutomationExercise website
    And I have products in my cart

  @smoke @checkout
  Scenario: Registered user can complete checkout
    Given I am logged in as a registered user
    And I have products in my cart
    When I proceed to checkout
    Then I should see my delivery address
    And I should see my billing address
    And I should see order review with correct products and prices
    When I add order comments "Please deliver carefully"
    And I click "Place Order"
    Then I should be taken to payment page
    When I enter valid payment details:
      | cardName   | John Doe           |
      | cardNumber | 4111111111111111   |
      | cvc        | 123                |
      | expMonth   | 12                 |
      | expYear    | 2025               |
    And I click "Pay and Confirm Order"
    Then I should see order confirmation
    And I should see "Congratulations! Your order has been confirmed!"

  @checkout
  Scenario: User registers during checkout
    Given I am not logged in
    And I have products in my cart
    When I proceed to checkout
    Then I should see login/register options
    When I click "Register / Login"
    And I complete registration with valid details
    Then I should be redirected back to checkout
    And I should be able to complete the order

  @checkout
  Scenario: Existing user logs in during checkout
    Given I am not logged in
    And I have a registered account
    And I have products in my cart
    When I proceed to checkout
    And I login with valid credentials
    Then I should be redirected back to checkout
    And I should see my saved address information

  @checkout @negative
  Scenario: Checkout fails with invalid payment details
    Given I am logged in and ready to checkout
    When I enter invalid payment details:
      | cardNumber | 1234567890123456 |
      | cvc        | 12               |
    And I click "Pay and Confirm Order"
    Then I should see payment error message

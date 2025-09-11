Feature: Checkout Process
  As a user
  I want to checkout my cart
  So that I can place an order

  Scenario: Place order: Register while checkout
    Given I have products in my cart
    When I click "Proceed To Checkout" button
    And I click "Register / Login" button
    And I register a new account
    And I click "Cart" button
    And I click "Proceed To Checkout" button
    Then I should see my address details
    And I should see my order details
    When I enter description in comment text area
    And I click "Place Order" button
    And I enter payment details
    And I click "Pay and Confirm Order" button
    Then I should see "Your order has been placed successfully!" message
    
  Scenario: Place order: Login before checkout
    Given I have products in my cart
    When I click "Proceed To Checkout" button
    And I click "Register / Login" button
    And I login with valid credentials
    And I click "Cart" button
    And I click "Proceed To Checkout" button
    Then I should see my address details
    And I should see my order details
    When I enter description in comment text area
    And I click "Place Order" button
    And I enter payment details
    And I click "Pay and Confirm Order" button
    Then I should see "Your order has been placed successfully!" message
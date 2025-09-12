Feature: Checkout Process
  As a user
  I want to checkout and place orders
  So that I can purchase products

  Scenario: Register while checkout
    Given I have products in my cart
    When I click on "Proceed To Checkout" button
    And I click on "Register / Login" link
    Then I should be redirected to login page
    When I register a new account
    And I click on "Cart" link
    And I click on "Proceed To Checkout" button
    Then I should see delivery address and billing address
    When I enter description in comment text area
    And I click on "Place Order" button
    Then I should be redirected to payment page
    When I enter payment details
    And I click on "Pay and Confirm Order" button
    Then I should see "ORDER PLACED!" message
    And I should see "Congratulations! Your order has been confirmed!" message

  Scenario: Register before checkout
    Given I am registered but not logged in
    When I login with valid credentials
    And I add products to cart
    And I click on "Cart" link
    And I click on "Proceed To Checkout" button
    Then I should see delivery address and billing address
    When I enter description in comment text area
    And I click on "Place Order" button
    Then I should be redirected to payment page
    When I enter payment details
    And I click on "Pay and Confirm Order" button
    Then I should see "ORDER PLACED!" message
    And I should see "Congratulations! Your order has been confirmed!" message

  Scenario: Login before checkout
    Given I am on the home page
    When I click on "Signup / Login" link
    And I login with valid credentials
    And I add products to cart
    And I click on "Cart" link
    And I click on "Proceed To Checkout" button
    Then I should see delivery address and billing address
    When I enter description in comment text area
    And I click on "Place Order" button
    Then I should be redirected to payment page
    When I enter payment details
    And I click on "Pay and Confirm Order" button
    Then I should see "ORDER PLACED!" message
    And I should see "Congratulations! Your order has been confirmed!" message

  Scenario: Download invoice after purchase
    Given I have placed an order
    When I click on "Download Invoice" button
    Then the invoice should be downloaded successfully
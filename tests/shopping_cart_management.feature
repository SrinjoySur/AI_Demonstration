Feature: Shopping Cart Management
  As a user,
  I want to manage my shopping cart,
  So that I can review and modify my selected items before checkout.

  Scenario: Add item to shopping cart
    Given I am on the product page
    When I click the "Add to Cart" button for a product
    Then the item should appear in the cart with correct details

  Scenario: Remove item from shopping cart
    Given I have items in my shopping cart
    When I click the "Remove" button for an item
    Then the item should be removed and the cart updated

  Scenario: Update quantity of an item in shopping cart
    Given I have items in my shopping cart
    When I update the quantity of an item to "2"
    Then the cart should reflect the new quantity and total price

  Scenario: Apply discount code to shopping cart
    Given I have items in my shopping cart
    When I enter a valid discount code "DISCOUNT10"
    And I click the "Apply" button
    Then the total price should be updated to reflect the discount
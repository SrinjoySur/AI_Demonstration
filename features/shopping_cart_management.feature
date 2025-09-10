Feature: Shopping Cart Management
  As a user,
  I want to manage my shopping cart,
  So that I can add, remove, and update items before checkout.

  Scenario: Add item to shopping cart
    Given I am on the product page
    When I add an item to the cart
    Then the item should appear in the shopping cart

  Scenario: Remove item from shopping cart
    Given I am on the shopping cart page
    When I remove an item from the cart
    Then the item should be removed from the cart

  Scenario: Update item quantity in shopping cart
    Given I am on the shopping cart page
    When I update the quantity of an item to "2"
    Then the cart should reflect the updated quantity

  Scenario: Apply discount code to shopping cart
    Given I am on the shopping cart page
    When I apply a valid discount code "DISCOUNT10"
    Then the total price should be updated to reflect the discount
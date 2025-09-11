Feature: Shopping Cart Management
  As a user,
  I want to manage my shopping cart,
  So that I can add, remove, and update items before checkout.

  Scenario: Add item to shopping cart
    Given I am viewing a product
    When I click "Add to Cart"
    Then the product should be added to my shopping cart

  Scenario: Remove item from shopping cart
    Given I am viewing my shopping cart
    When I click "Remove" on an item
    Then the item should be removed from my cart

  Scenario: Update item quantity in shopping cart
    Given I am viewing my shopping cart
    When I update the quantity of an item to "2"
    Then the cart should reflect the updated quantity and total price

  Scenario: Apply discount code to shopping cart
    Given I am viewing my shopping cart
    When I enter a valid discount code "DISCOUNT10"
    And I click "Apply"
    Then the total price should be updated to reflect the discount
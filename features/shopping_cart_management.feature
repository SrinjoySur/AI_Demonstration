Feature: Shopping Cart Management
  As a shopper,
  I want to manage items in my shopping cart,
  So that I can review and modify my purchase before checkout.

  Scenario: Add item to cart
    Given I am on a product page
    When I click the "Add to cart" button
    Then the item should appear in the cart with correct details

  Scenario: Remove item from cart
    Given I have items in my shopping cart
    When I click the "Remove" button for an item
    Then the item should be removed and the cart updated

  Scenario: Update item quantity in cart
    Given I have items in my shopping cart
    When I update the quantity of an item to "2"
    Then the cart should reflect the new quantity
    And the total price should be updated

  Scenario: Apply discount code
    Given I have items in my shopping cart
    When I enter a valid discount code "DISCOUNT10"
    And I click the "Apply" button
    Then the total price should be updated to reflect the discount
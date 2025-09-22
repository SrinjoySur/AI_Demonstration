Feature: Shopping Cart Management
  As a user
  I want to add, remove, and update products in my cart
  So that I can manage my shopping before checkout

  Scenario: Add product to cart
    Given I am on a product page
    When I click "Add to cart"
    Then the product should appear in my cart

  Scenario: Remove product from cart
    Given I have products in my cart
    When I remove a product
    Then the product should no longer appear in my cart

  Scenario: Update product quantity in cart
    Given I have products in my cart
    When I change the quantity of a product
    Then the cart should reflect the updated quantity
Feature: Shopping Cart
  As a user
  I want to add products to cart and manage quantities
  So that I can purchase multiple items

  Background:
    Given I am on the AutomationExercise website

  @smoke @cart
  Scenario: User can add product to cart from products page
    Given I am on the products page
    When I click "Add to cart" for "Blue Top"
    Then I should see a success message
    When I click "View Cart"
    Then I should see "Blue Top" in my cart
    And the quantity should be 1
    And the total price should be calculated correctly

  @cart
  Scenario: User can add multiple quantities of same product
    Given I am on a product detail page for "Blue Top"
    When I set quantity to 3
    And I click "Add to cart"
    And I navigate to cart
    Then I should see "Blue Top" with quantity 3
    And the total price should be 3 times the unit price

  @cart
  Scenario: User can add multiple different products to cart
    Given I am on the products page
    When I add "Blue Top" to cart
    And I add "Men Tshirt" to cart
    And I navigate to cart
    Then I should see both products in cart:
      | product   | quantity |
      | Blue Top  | 1        |
      | Men Tshirt| 1        |
    And the total should be sum of both product prices

  @cart
  Scenario: User can update product quantity in cart
    Given I have "Blue Top" in my cart with quantity 1
    When I update the quantity to 4
    Then the quantity should be updated to 4
    And the total price should be recalculated

  @cart
  Scenario: User can remove product from cart
    Given I have products in my cart
    When I click the delete button for "Blue Top"
    Then "Blue Top" should be removed from cart
    And the cart total should be updated

  @cart
  Scenario: User can proceed to checkout from cart
    Given I have products in my cart
    When I click "Proceed To Checkout"
    Then I should be taken to the checkout page

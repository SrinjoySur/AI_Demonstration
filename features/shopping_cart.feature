Feature: Shopping Cart Operations
  As a user
  I want to manage items in my shopping cart
  So that I can purchase selected products

  Background:
    Given I am on the AutomationExercise homepage

  @smoke @cart
  Scenario: Add single product to cart
    Given I am on the products page
    When I click "Add to cart" for "Blue Top"
    Then I should see a success message
    When I click "View Cart"
    Then I should see "Blue Top" in the cart
    And the quantity should be "1"
    And the price should be "Rs. 500"

  @cart @quantity
  Scenario: Add product with specific quantity
    Given I am viewing product details for "Blue Top"
    When I set quantity to "3"
    And I click "Add to cart"
    And I view the cart
    Then I should see "Blue Top" with quantity "3"
    And the total should be "Rs. 1500"

  @cart @multiple
  Scenario: Add multiple different products to cart
    Given I am on the products page
    When I add the following products to cart:
      | product        | quantity |
      | Blue Top       | 2        |
      | Men Tshirt     | 1        |
      | Sleeveless Dress| 1       |
    And I view the cart
    Then I should see all added products in the cart
    And the cart total should be calculated correctly

  @cart @update
  Scenario: Update product quantity in cart
    Given I have "Blue Top" in my cart with quantity "1"
    When I update the quantity to "5"
    Then the quantity should be updated to "5"
    And the total price should be recalculated

  @cart @remove
  Scenario: Remove product from cart
    Given I have multiple products in my cart
    When I click the remove button for "Blue Top"
    Then "Blue Top" should be removed from the cart
    And the cart total should be recalculated

  @cart @empty
  Scenario: View empty cart
    Given I have an empty cart
    When I navigate to the cart page
    Then I should see an empty cart message
    Or the cart should show no items

  @cart @persistence
  Scenario: Cart persistence after login
    Given I have items in my cart as a guest user
    When I login to my account
    Then my cart items should be preserved
    And I should see the same products and quantities

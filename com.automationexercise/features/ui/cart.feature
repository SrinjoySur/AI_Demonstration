Feature: Shopping Cart

  Scenario: Add item to cart
    Given I am on the product page
    When I click on 'Add to cart'
    Then the item should be added to the cart

  Scenario: Remove item from cart
    Given I have items in the cart
    When I click on 'Remove from cart'
    Then the item should be removed from the cart
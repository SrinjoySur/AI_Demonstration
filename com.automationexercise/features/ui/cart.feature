Feature: Cart Management

  Scenario: Add item to cart
    Given I am on the product page
    When I add item "123" to the cart
    Then I should see item "123" in the cart
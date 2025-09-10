Feature: Cart Operations

  Scenario: User views cart
    Given the user navigates to the cart page
    Then the user should see the list of products in the cart

  Scenario: User proceeds to checkout
    Given the user navigates to the cart page
    When the user clicks the "Checkout" button
    Then the user should be redirected to the checkout page
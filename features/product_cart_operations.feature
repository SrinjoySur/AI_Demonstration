Feature: Product Cart Operations

  Scenario: User adds product to cart
    Given the user navigates to the product details page
    When the user clicks the "Add to cart" button
    Then the product should be added to the cart

  Scenario: User removes product from cart
    Given the user has products in the cart
    When the user clicks the "Remove" button next to a product
    Then the product should be removed from the cart
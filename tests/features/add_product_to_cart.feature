Feature: Add Product to Cart
  As a user
  I want to add a product to my cart
  So that I can purchase it later

  Scenario: User adds a product to the cart
    Given the user is on the Product Details page
    When the user clicks on the "Add to cart" button
    Then the product should be added to the cart
    And the user should see a confirmation message
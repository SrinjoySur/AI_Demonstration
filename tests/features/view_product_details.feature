Feature: View Product Details
  As a user
  I want to view the details of a product
  So that I can learn more about it before making a purchase

  Scenario: User views the details of a product
    Given the user is on the Products page
    When the user clicks on the "View Product" link for the first product
    Then the user should be redirected to the Product Details page
    And the user should see the product details including name, category, price, quantity, and availability
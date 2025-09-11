Feature: Product Browsing and Cart Operations

  Scenario: User adds product to cart
    Given I navigate to the Products page
    When I view the details of a product
    And I click on the "Add to cart" button
    Then I should see the product added to the cart
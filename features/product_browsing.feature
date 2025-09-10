Feature: Product Browsing

  Scenario: User views all products
    Given the user navigates to the products page
    Then the user should see a list of all products

  Scenario: User searches for a product
    Given the user navigates to the products page
    When the user enters a product name in the search bar
    And the user clicks the search button
    Then the user should see the search results

  Scenario: User views product details
    Given the user navigates to the products page
    When the user clicks on a product
    Then the user should see the product details
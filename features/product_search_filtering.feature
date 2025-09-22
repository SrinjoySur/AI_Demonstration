Feature: Product Search and Filtering
  As a user
  I want to search and filter products
  So that I can find products that match my criteria

  Scenario: Search for a product
    Given I am on the home page
    When I enter a product name in the search bar
    And I click the search button
    Then I should see relevant products in the results

  Scenario: Filter products by category
    Given I am on the products page
    When I select a category filter
    Then I should see products only from that category
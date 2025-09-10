Feature: Product Search and Filtering
  As a user,
  I want to search and filter products,
  So that I can find items that meet my criteria quickly.

  Scenario: Search with valid search term
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And I click the "Products" button
    Then I should see a list of products matching the term "laptop"

  Scenario: Search with invalid search term
    Given I am on the product search page
    When I enter an invalid search term "xyz123"
    And I click the "Products" button
    Then I should see a message "No results found"

  Scenario: Apply filters to search results
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And I apply filters "price range $500-$1000" and "category electronics"
    And I click the "Products" button
    Then I should see products that match the filter criteria

  Scenario: Navigate through pagination
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And I click the "Products" button
    And there are multiple pages of results
    When I click the "Next" button
    Then I should be able to view the next page of results
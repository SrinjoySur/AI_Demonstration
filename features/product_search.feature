Feature: Product Search and Filtering
  As a user,
  I want to search and filter products,
  So that I can find items that meet my criteria quickly.

  Scenario: Search with valid search term
    Given I am on the search page
    When I enter a valid search term "laptop"
    And I click the "Search" button
    Then I should see a list of products matching the term

  Scenario: Search with invalid search term
    Given I am on the search page
    When I enter an invalid search term "xyz123"
    And I click the "Search" button
    Then I should see a message indicating no results were found

  Scenario: Apply filters to search results
    Given I am on the search page
    When I enter a valid search term "laptop"
    And I apply filters for price range "$500-$1000" and category "Electronics"
    And I click the "Search" button
    Then I should see products that match the filter criteria

  Scenario: View paginated search results
    Given I am on the search page
    When I enter a valid search term "laptop"
    And there are more products than can fit on one page
    Then I should see paginated results
Feature: Product Search and Filtering
  As a shopper,
  I want to search for products and apply filters,
  So that I can find items that meet my criteria quickly.

  Scenario: Search with valid term
    Given I am on the homepage
    When I enter a valid search term "laptop" in the search bar
    And I click the search button
    Then I should see relevant product results

  Scenario: Search with invalid term
    Given I am on the homepage
    When I enter an invalid search term "xyzabc123" in the search bar
    And I click the search button
    Then I should see a message "No results found"

  Scenario: Apply price range filter
    Given I am on the search results page
    When I apply a price range filter from "$500" to "$1000"
    Then I should see products within the price range

  Scenario: Navigate through paginated results
    Given I am on the search results page with multiple pages
    When I click on the next page button
    Then I should see additional products on the subsequent page
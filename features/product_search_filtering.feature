Feature: Product Search and Filtering
  As a user,
  I want to search and filter products,
  So that I can find items that match my criteria quickly.

  Scenario: Search with valid term
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And I click the search button
    Then I should see a list of matching products

  Scenario: Search with invalid term
    Given I am on the product search page
    When I enter an invalid search term "xyzabc123"
    And I click the search button
    Then I should see a message indicating no results found

  Scenario: Apply filters to product search
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And I apply filters for category "Electronics", price range "$500-$1000", and rating "4 stars and above"
    And I click the search button
    Then I should see products that match the selected filters

  Scenario: Paginated search results
    Given I am on the product search page
    When I enter a valid search term "laptop"
    And there are more results than can be displayed on one page
    Then I should see paginated results
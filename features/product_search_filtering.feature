Feature: Product Search and Filtering

  Scenario: Successful product search with valid search term
    Given the user is on the product search page
    When the user enters a valid search term
    And the user submits the search
    Then the user should see a list of matching products

  Scenario: No results found for invalid search term
    Given the user is on the product search page
    When the user enters an invalid search term
    And the user submits the search
    Then the user should see a message indicating no results found

  Scenario: Successful product filtering
    Given the user is on the product search page
    When the user applies filters
    Then the user should see products that match the selected filters

  Scenario: Pagination of search results
    Given the user is on the product search page
    When there are more results than can be displayed on one page
    Then the user should be able to navigate through paginated results
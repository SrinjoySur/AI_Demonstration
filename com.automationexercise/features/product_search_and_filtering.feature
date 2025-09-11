Feature: Product Search and Filtering

  Scenario: Successful product search with valid search term
    Given the user is on the product search page
    When the user enters a valid search term "laptop"
    And the user submits the search query
    Then the user should see a list of relevant products

  Scenario: No results found with invalid search term
    Given the user is on the product search page
    When the user enters an invalid search term "xyz123"
    And the user submits the search query
    Then the user should see a message indicating no results found

  Scenario: Successful product filtering by category
    Given the user is on the product search page
    When the user selects the category filter "Electronics"
    And the user applies the filter
    Then the user should see products that match the selected category

  Scenario: Paginated product results
    Given the user is on the product search page
    When the user enters a valid search term "phone"
    And the search results exceed one page
    Then the user should be able to navigate through paginated results
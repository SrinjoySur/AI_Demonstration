Feature: Products Page Edge Cases
  As a user
  I want to browse, search, filter, and interact with products
  So that I can find and purchase items I'm interested in

  Background:
    Given I am on the products page

  Scenario: Search with a single character
    When I enter "t" in the search box
    And I click the search button
    Then I should see products containing "t" in their name
    And the search results should be displayed correctly

  Scenario: Search with special characters
    When I enter "#$%" in the search box
    And I click the search button
    Then the system should handle the input gracefully
    And an appropriate message should be displayed

  Scenario: Search with extremely long search term
    When I enter a search term with 100+ characters
    And I click the search button
    Then the system should process the request without crashing
    And display relevant results or no results message

  Scenario: Search with no matching products
    When I enter "nonexistentproduct12345" in the search box
    And I click the search button
    Then I should see a "No products found" message
    And the page should not be empty

  Scenario: Filter by multiple categories simultaneously
    When I select the "Women" category
    And I also select the "Men" category
    Then I should see products from both the "Women" and "Men" categories
    And the filter selection should be visibly active

  Scenario: Filter by category with no products
    When I select a category that contains no products
    Then I should see a "No products in this category" message
    And the page should not be empty

  Scenario: Apply multiple filter types
    When I select the "Women" category
    And I select the "Polo" brand
    Then I should only see women's products from the Polo brand
    And both filter selections should be visibly active

  Scenario: View product with extremely long text
    When I view a product with an extremely long description or name
    Then the text should be properly displayed without breaking the page layout
    And all product information should be readable

  Scenario: Rapid clicking on multiple products
    When I rapidly click "View Product" on multiple products in succession
    Then the system should handle each request properly
    And there should be no UI glitches or crashes

  Scenario: Add same product multiple times rapidly
    When I add the same product to cart multiple times in rapid succession
    Then the system should correctly update the quantity
    And not duplicate the line item in the cart
    And show the correct total quantity

  Scenario: Navigate to last page with fewer products
    When I navigate to the last page of products
    Then the page should display correctly without layout issues
    And I should see fewer products than the standard page size

  Scenario: Return to first page after filtering
    Given I am on page 2 of the products page
    When I apply a search filter that returns fewer results
    Then I should be returned to page 1 of the filtered results
    And the filtered results should be displayed correctly
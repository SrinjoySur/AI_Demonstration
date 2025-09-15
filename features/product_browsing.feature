Feature: Product Browsing and Search
  As a user
  I want to browse and search for products
  So that I can find items I want to purchase

  Background:
    Given I am on the AutomationExercise homepage

  @smoke @products
  Scenario: View all products
    When I navigate to the products page
    Then I should see the "ALL PRODUCTS" heading
    And I should see a list of products with details:
      | name | price | image |
    And each product should have a "View Product" link

  @products @details
  Scenario: View product details
    Given I am on the products page
    When I click "View Product" for the first product
    Then I should see the product detail page
    And I should see product information:
      | name | category | price | availability | condition | brand |
    And I should see product images
    And I should see quantity selector
    And I should see "Add to cart" button

  @search @products
  Scenario: Search for products
    Given I am on the products page
    When I search for "Blue Top"
    Then I should see search results containing "Blue Top"
    And all displayed products should match the search criteria

  @search @negative
  Scenario: Search for non-existent product
    Given I am on the products page
    When I search for "NonExistentProduct123"
    Then I should see no search results
    Or I should see "No products found" message

  @categories
  Scenario: Browse products by category
    Given I am on the products page
    When I click on "Women" category
    And I click on "Tops" subcategory
    Then I should see products filtered by "Women > Tops" category
    And the page title should indicate the selected category

  @brands
  Scenario: Browse products by brand
    Given I am on the products page
    When I click on "Polo" brand
    Then I should see products filtered by "Polo" brand
    And all displayed products should be from "Polo" brand

  @products @pagination
  Scenario: Navigate through product pages
    Given I am on the products page
    When there are multiple pages of products
    Then I should see pagination controls
    And I should be able to navigate between pages

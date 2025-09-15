Feature: Product Catalog
  As a user
  I want to browse and search products
  So that I can find items I want to purchase

  Background:
    Given I am on the AutomationExercise website

  @smoke @products
  Scenario: User can view all products
    Given I navigate to the products page
    Then I should see the "All Products" heading
    And I should see a list of products with details:
      | field       |
      | product name|
      | price       |
      | image       |
    And each product should have "View Product" and "Add to cart" options

  @products
  Scenario: User can search for products
    Given I am on the products page
    When I search for "Blue Top"
    And I click the search button
    Then I should see search results containing "Blue Top"
    And all displayed products should be relevant to the search term

  @products
  Scenario: User can view product details
    Given I am on the products page
    When I click "View Product" for the first product
    Then I should be on the product detail page
    And I should see product information:
      | field        |
      | product name |
      | category     |
      | price        |
      | availability |
      | condition    |
      | brand        |
    And I should see quantity selector
    And I should see "Add to cart" button

  @products
  Scenario: User can filter products by category
    Given I am on the products page
    When I click on "Women" category
    Then I should see only women's products
    And the page should show category-specific products

  @products
  Scenario: User can filter products by brand
    Given I am on the products page
    When I click on "Polo" brand
    Then I should see only Polo brand products
    And all displayed products should be from Polo brand

  @products @negative
  Scenario: User searches for non-existent product
    Given I am on the products page
    When I search for "NonExistentProduct123"
    And I click the search button
    Then I should see "No products found" message

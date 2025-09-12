Feature: Products Page Performance and Accessibility
  As a user
  I want the products page to be performant and accessible
  So that I can have a smooth and inclusive shopping experience

  Background:
    Given I am on the products page

  Scenario: Page load performance
    When I measure the page load time
    Then the page should load within acceptable time limits
    And all critical elements should be visible within 3 seconds

  Scenario: Search response time
    When I search for "dress"
    Then the search results should load within 3 seconds
    And the page should remain responsive during search

  Scenario: Filter response time
    When I select the "Women" category
    Then the filtered results should load within 3 seconds
    And the page should remain responsive during filtering

  Scenario: Product image loading
    When I scroll through the products page
    Then product images should load progressively
    And placeholder images should be shown while loading

  Scenario: Keyboard navigation
    When I navigate the page using only the keyboard
    Then I should be able to access all interactive elements
    And the focus should be visibly indicated

  Scenario: Screen reader compatibility
    When I examine the page with screen reader detection
    Then all important elements should have appropriate ARIA labels
    And images should have descriptive alt text

  Scenario: Color contrast
    When I check the color contrast of text elements
    Then all text should have sufficient contrast with its background
    And important UI elements should be distinguishable

  Scenario: Responsive design
    When I resize the browser to mobile dimensions
    Then the page layout should adapt appropriately
    And all functionality should remain accessible

  Scenario: Font scaling
    When I increase the browser font size by 200%
    Then the text should scale without loss of functionality
    And no content should be cut off or overlap

  Scenario: Network throttling resilience
    When I simulate a slow network connection
    Then the page should load essential content first
    And provide appropriate feedback during loading
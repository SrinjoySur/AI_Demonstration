Feature: Home Page Edge Cases

  Scenario: Home Page Loading with Poor Network Connectivity
    Given the user has a slow network connection
    When the user navigates to the home page
    Then critical elements should load first
    And the page should be functional even before complete loading
    And images should load progressively or have placeholders

  Scenario: Home Page Responsiveness at Extreme Viewport Sizes
    Given the user is on the home page
    When the user resizes the viewport to extremely narrow width
    Then content should reflow appropriately with no horizontal scrolling
    When the user resizes the viewport to extremely wide width
    Then content should utilize the space effectively
    When the user resizes the viewport to extremely short height
    Then content should adapt appropriately to the short viewport
    When the user resizes the viewport to extremely tall height
    Then content should adapt appropriately to the tall viewport

  Scenario: Home Page Behavior with Ad Blockers
    Given the user has an ad blocker enabled
    When the user navigates to the home page
    Then the page should load without errors
    And no broken layouts should appear where ads would normally be
    And core functionality should remain intact

  Scenario: Home Page Performance with Maximum Products Loaded
    Given the user is on the home page
    When the user scrolls to load all products
    Then the page should remain responsive
    And scrolling should remain smooth
    And all product images and information should load correctly

  Scenario: Home Page Accessibility with Screen Readers
    Given the user has a screen reader enabled
    When the user navigates to the home page
    Then all images should have appropriate alt text
    And navigation structure should be properly announced
    And focus order should be logical
    And interactive elements should be properly labeled

  Scenario: Home Page Behavior with JavaScript Disabled
    Given the user has JavaScript disabled
    When the user navigates to the home page
    Then critical content should still be visible
    And appropriate fallback for dynamic functionality should be provided
    And navigation menu should still be accessible

  Scenario: Home Page Handling of Special Characters in Search
    Given the user is on the home page
    When the user enters special characters in the search box
    And submits the search
    Then no JavaScript errors should occur
    And special characters should be properly escaped
    And appropriate "no results" message should be displayed for invalid searches

  Scenario: Home Page Cache Behavior
    Given the user has visited the home page before
    When the user revisits the home page
    Then the second visit should load faster than the first visit
    And cached resources should be utilized
    And dynamic content should still be updated if changed
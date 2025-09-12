Feature: Subscription
  As a website visitor
  I want to subscribe to the newsletter
  So that I can receive updates and offers

  Scenario: Subscribe from homepage
    Given I am on the Automation Exercise homepage
    When I scroll down to the footer
    And I enter my email address "subscriber@example.com" in the subscription input
    And I click the arrow button
    Then I should see "You have been successfully subscribed!" message

  Scenario: Subscribe from cart page
    Given I am on the Automation Exercise homepage
    When I click on "Cart" button
    And I scroll down to the footer
    And I enter my email address "subscriber@example.com" in the subscription input
    And I click the arrow button
    Then I should see "You have been successfully subscribed!" message

  Scenario: Subscribe with invalid email format
    Given I am on the Automation Exercise homepage
    When I scroll down to the footer
    And I enter my email address "invalid-email" in the subscription input
    And I click the arrow button
    Then I should see an error message about invalid email format

  Scenario: Subscribe with already subscribed email
    Given I am on the Automation Exercise homepage
    And I have already subscribed with email "subscriber@example.com"
    When I scroll down to the footer
    And I enter my email address "subscriber@example.com" in the subscription input
    And I click the arrow button
    Then I should see "Email address already subscribed!" message
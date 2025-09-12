Feature: Contact and Subscription
  As a user
  I want to contact the website and subscribe to newsletter
  So that I can get support and stay updated

  Scenario: Submit contact form
    Given I am on the home page
    When I click on "Contact us" link
    Then I should be redirected to contact page
    When I enter name, email, subject and message
    And I upload a file
    And I click on "Submit" button
    Then I should see "Success! Your details have been submitted successfully." message
    When I click on "Home" link
    Then I should be redirected to home page

  Scenario: Verify subscription in home page
    Given I am on the home page
    When I scroll down to footer
    And I enter email address in subscription input
    And I click on subscription arrow button
    Then I should see "You have been successfully subscribed!" message

  Scenario: Verify subscription in cart page
    Given I am on the cart page
    When I scroll down to footer
    And I enter email address in subscription input
    And I click on subscription arrow button
    Then I should see "You have been successfully subscribed!" message
Feature: User Registration

  Scenario: User successfully registers
    Given I navigate to the Signup/Login page
    When I fill out the signup form with the following details:
      | Name           | Email Address           |
      | Test User      | testuser@example.com    |
    And I click on the "Signup" button
    Then I should see a message indicating that the registration was successful
Feature: User Login

  Scenario: User successfully logs in
    Given I navigate to the Signup/Login page
    When I fill out the login form with the following details:
      | Email Address           | Password           |
      | testuser@example.com    | password123        |
    And I click on the "Login" button
    Then I should see a message indicating that the login was successful
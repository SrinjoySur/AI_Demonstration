Feature: User Signup

  Scenario: Successful signup
    Given the signup page is displayed
    When I enter a valid email "user@example.com"
    And I click the Signup button
    Then I should see the registration form

  Scenario: Signup with existing email
    Given the signup page is displayed
    When I enter an existing email "existing@example.com"
    And I click the Signup button
    Then I should see an error message "Email already exists"
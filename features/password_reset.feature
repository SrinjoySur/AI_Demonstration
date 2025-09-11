Feature: Password Reset
  As a user,
  I want to reset my password,
  So that I can regain access to my account if I forget my password.

  Scenario: Request password reset with valid email
    Given I am on the login page
    When I click "Forgot Password"
    And I enter a valid email "user@example.com"
    Then I should receive a password reset link via email

  Scenario: Request password reset with invalid email
    Given I am on the login page
    When I click "Forgot Password"
    And I enter an invalid email "userexample.com"
    Then I should see an error message indicating the email is not registered

  Scenario: Reset password with valid link and new password
    Given I have received a password reset link
    When I click the link
    And I enter a new valid password "NewPassword123!"
    Then my password should be successfully reset

  Scenario: Reset password with expired link
    Given I have received a password reset link
    When I click the link after it has expired
    Then I should see an error message indicating the link has expired
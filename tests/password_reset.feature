Feature: Password Reset
  As a user,
  I want to reset my password,
  So that I can regain access to my account if I forget my password.

  Scenario: Request password reset with valid email
    Given I am on the password reset page
    When I enter a valid email "user@example.com"
    And I click the "Submit" button
    Then I should receive a password reset link via email

  Scenario: Request password reset with invalid email
    Given I am on the password reset page
    When I enter an invalid email "userexample.com"
    And I click the "Submit" button
    Then I should see an error message "Email is not registered"

  Scenario: Set new password using valid reset link
    Given I have received a valid password reset link
    When I click the link
    And I enter a new valid password "NewPassword123!"
    And I click the "Submit" button
    Then I should see a confirmation message "Password reset successful"
    And I should be able to log in with the new password

  Scenario: Attempt to use expired password reset link
    Given I have received an expired password reset link
    When I click the link
    Then I should see an error message "Password reset link has expired
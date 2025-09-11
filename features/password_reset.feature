Feature: Password Reset
  As a registered user,
  I want to reset my password,
  So that I can regain access to my account if I forget my password.

  Scenario: Request password reset with valid email
    Given I am on the password reset page
    When I enter a valid email "user@example.com"
    And I click the "Send reset link" button
    Then I should receive a password reset link via email

  Scenario: Request password reset with invalid email
    Given I am on the password reset page
    When I enter an invalid email "user@invalid"
    And I click the "Send reset link" button
    Then I should see an error message "Email is not registered"

  Scenario: Reset password with valid link
    Given I have received a password reset link
    When I click the link within the valid time frame
    And I enter a new valid password "NewPassword123!"
    And I click the "Reset password" button
    Then I should be able to set a new password
    And I should see a confirmation message "Password reset successful"

  Scenario: Reset password with expired link
    Given I have received a password reset link
    When I click the link after the valid time frame
    Then I should see a message "Password reset link has expired"
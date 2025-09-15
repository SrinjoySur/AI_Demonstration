Feature: Password Reset
  As a user
  I want to reset my password
  So that I can regain access to my account if I forget my password

  Scenario: Request password reset
    Given I am on the login page
    When I click on "Forgot password?"
    And I enter my registered email
    Then I should receive a password reset email

  Scenario: Reset password with link
    Given I have received a password reset email
    When I click the reset link
    And I enter a new password
    Then my password should be updated and I should be able to login
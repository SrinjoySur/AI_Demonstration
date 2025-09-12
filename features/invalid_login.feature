Feature: Login with Invalid Credentials

  Background:
    Given I am on the Automation Exercise homepage
    When I click on the "Signup / Login" button
    Then I should see the "Login to your account" section

  Scenario: Login with non-existent email
    When I enter "nonexistent@example.com" in the login email field
    And I enter "password123" in the login password field
    And I click the "Login" button
    Then I should see the error message "Your email or password is incorrect!"

  Scenario: Login with incorrect password
    When I enter "existing@example.com" in the login email field
    And I enter "wrongpassword" in the login password field
    And I click the "Login" button
    Then I should see the error message "Your email or password is incorrect!"

  Scenario: Login with empty email field
    When I leave the login email field empty
    And I enter "password123" in the login password field
    And I click the "Login" button
    Then I should see a validation error for the empty email field

  Scenario: Login with empty password field
    When I enter "existing@example.com" in the login email field
    And I leave the login password field empty
    And I click the "Login" button
    Then I should see a validation error for the empty password field

  Scenario: Login with invalid email format
    When I enter "invalid-email-format" in the login email field
    And I enter "password123" in the login password field
    And I click the "Login" button
    Then I should see an error message about invalid email format
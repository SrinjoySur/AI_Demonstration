Feature: User Registration
  As a new user,
  I want to register an account,
  So that I can access personalized features and make purchases.

  Scenario: Successful registration with valid email and password
    Given I am on the registration page
    When I enter a valid email "user@example.com" and a valid password "Password123!"
    And I click the register button
    Then I should be successfully registered
    And I should see a confirmation message "Registration successful"

  Scenario: Registration with invalid email format
    Given I am on the registration page
    When I enter an invalid email "user@invalid" and a valid password "Password123!"
    And I click the register button
    Then I should see an error message "Invalid email format"

  Scenario: Registration with weak password
    Given I am on the registration page
    When I enter a valid email "user@example.com" and a weak password "password"
    And I click the register button
    Then I should see an error message "Password must be at least 8 characters, include one uppercase letter, one number, and one special character"

  Scenario: Registration with already registered email
    Given I am on the registration page
    When I enter an already registered email "existinguser@example.com" and a valid password "Password123!"
    And I click the register button
    Then I should see an error message "Email is already registered"
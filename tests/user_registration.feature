Feature: User Registration
  As a new user,
  I want to register for an account,
  So that I can access personalized features and services.

  Scenario: Successful registration with valid email and password
    Given I am on the registration page
    When I enter a valid email "user@example.com" and a valid password "Password123!"
    And I click the "Signup / Login" button
    Then I should see a confirmation message "Registration successful"
    And I should be redirected to the login page

  Scenario: Registration with invalid email format
    Given I am on the registration page
    When I enter an invalid email "userexample.com" and a valid password "Password123!"
    And I click the "Signup / Login" button
    Then I should see an error message "Invalid email format"

  Scenario: Registration with password that does not meet requirements
    Given I am on the registration page
    When I enter a valid email "user@example.com" and an invalid password "pass"
    And I click the "Signup / Login" button
    Then I should see an error message "Password must be at least 8 characters long and include a special character"

  Scenario: Registration with an already registered email
    Given I am on the registration page
    When I enter an already registered email "existinguser@example.com" and a valid password "Password123!"
    And I click the "Signup / Login" button
    Then I should see an error message "Email is already registered"
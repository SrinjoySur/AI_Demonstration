Feature: User Registration
  As a new user,
  I want to register an account,
  So that I can access personalized features and services.

  Scenario: Successful registration with valid email and password
    Given I am on the registration page
    When I enter a valid email "user@example.com" and password "Password123!"
    And I click the "Register" button
    Then I should be successfully registered
    And I should receive a confirmation email

  Scenario: Registration with invalid email format
    Given I am on the registration page
    When I enter an invalid email "userexample.com" and password "Password123!"
    And I click the "Register" button
    Then I should see an error message indicating the email format is incorrect

  Scenario: Registration with password that does not meet requirements
    Given I am on the registration page
    When I enter a valid email "user@example.com" and password "pass"
    And I click the "Register" button
    Then I should see an error message indicating the password requirements

  Scenario: Registration with already registered email
    Given I am on the registration page
    When I enter an email "existinguser@example.com" that is already registered and password "Password123!"
    And I click the "Register" button
    Then I should see an error message indicating the email is already registered
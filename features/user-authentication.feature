Feature: User Authentication
  As a user
  I want to register and login to the website
  So that I can access personalized features

  Background:
    Given I am on the AutomationExercise website

  @smoke @authentication
  Scenario: User successfully registers with valid details
    Given I navigate to the signup/login page
    When I enter valid signup details:
      | name     | John Doe              |
      | email    | john.doe@example.com  |
    And I click the signup button
    Then I should see the account information form
    When I fill in all required account details
    And I submit the account creation form
    Then I should see account created confirmation
    And I should be logged in as "John Doe"

  @smoke @authentication
  Scenario: User successfully logs in with valid credentials
    Given I have a registered account with email "john.doe@example.com" and password "password123"
    And I navigate to the signup/login page
    When I enter valid login credentials:
      | email    | john.doe@example.com |
      | password | password123          |
    And I click the login button
    Then I should be logged in successfully
    And I should see "Logged in as John Doe"

  @authentication @negative
  Scenario: User cannot login with invalid credentials
    Given I navigate to the signup/login page
    When I enter invalid login credentials:
      | email    | invalid@example.com |
      | password | wrongpassword       |
    And I click the login button
    Then I should see an error message "Your email or password is incorrect!"

  @authentication @negative
  Scenario: User cannot register with existing email
    Given I have a registered account with email "existing@example.com"
    And I navigate to the signup/login page
    When I try to signup with existing email "existing@example.com"
    Then I should see an error message "Email Address already exist!"

  @authentication
  Scenario: User successfully logs out
    Given I am logged in as a user
    When I click the logout button
    Then I should be logged out successfully
    And I should see the login/signup options

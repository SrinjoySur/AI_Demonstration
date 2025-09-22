Feature: User Authentication
  As a user
  I want to register, login, and logout
  So that I can securely access my account

  Scenario: User registration
    Given I am on the registration page
    When I enter valid user details
    And I submit the registration form
    Then I should see a registration success message

  Scenario: User login
    Given I am on the login page
    When I enter valid credentials
    And I submit the login form
    Then I should be logged in and redirected to my dashboard

  Scenario: User logout
    Given I am logged in
    When I click the logout button
    Then I should be logged out and see the login page
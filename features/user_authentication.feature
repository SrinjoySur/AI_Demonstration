Feature: User Registration and Authentication
  As a user
  I want to register, login, and logout
  So that I can access personalized features

  Background:
    Given I am on the AutomationExercise homepage

  @smoke @registration
  Scenario: Successful user registration
    Given I navigate to the signup/login page
    When I enter valid signup details:
      | name     | email                    |
      | John Doe | john.doe.test@email.com |
    And I click the signup button
    And I fill in the account information:
      | title | password  | firstName | lastName | company    | address1      | address2 | country | state      | city    | zipcode | mobileNumber |
      | Mr.   | Test123!  | John      | Doe      | TestCorp   | 123 Test St   | Apt 1    | India   | California | TestCity| 12345   | 1234567890   |
    And I select date of birth as "1" "January" "1990"
    And I check the newsletter and special offers checkboxes
    And I click create account button
    Then I should see "ACCOUNT CREATED!" message
    And I click continue button
    Then I should see "Logged in as John Doe" in the header

  @smoke @login
  Scenario: Successful user login with valid credentials
    Given I navigate to the signup/login page
    When I enter valid login credentials:
      | email                    | password |
      | john.doe.test@email.com | Test123! |
    And I click the login button
    Then I should see "Logged in as John Doe" in the header

  @negative @login
  Scenario: Failed login with invalid credentials
    Given I navigate to the signup/login page
    When I enter invalid login credentials:
      | email                    | password    |
      | john.doe.test@email.com | WrongPass123|
    And I click the login button
    Then I should see "Your email or password is incorrect!" error message

  @registration @negative
  Scenario: Registration with existing email
    Given I navigate to the signup/login page
    When I enter signup details with existing email:
      | name     | email                    |
      | Jane Doe | john.doe.test@email.com |
    And I click the signup button
    Then I should see "Email Address already exist!" error message

  @logout
  Scenario: Successful user logout
    Given I am logged in as a user
    When I click the logout button
    Then I should be redirected to the login page
    And I should not see user name in the header

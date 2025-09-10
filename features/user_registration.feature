Feature: User Registration

  Scenario: Successful registration with valid email and password
    Given the user is on the registration page
    When the user enters a valid email and password
    And the user submits the registration form
    Then the user should be successfully registered
    And the user should see a confirmation message

  Scenario: Registration failure due to invalid email format
    Given the user is on the registration page
    When the user enters an invalid email format
    And the user submits the registration form
    Then the user should see an error message indicating the email is invalid

  Scenario: Registration failure due to weak password
    Given the user is on the registration page
    When the user enters a password that does not meet the requirements
    And the user submits the registration form
    Then the user should see an error message indicating the password requirements

  Scenario: Registration failure due to already registered email
    Given the user is on the registration page
    When the user enters an email that is already registered
    And the user submits the registration form
    Then the user should see an error message indicating the email is already registered
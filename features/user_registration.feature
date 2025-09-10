Feature: User Registration

  Scenario: Successful registration with valid email and password
    Given the user is on the registration page
    When the user enters a valid email "user@example.com" and a valid password "Password123!"
    And the user submits the registration form
    Then the user should be successfully registered
    And the user should see a confirmation message

  Scenario: Registration fails with invalid email format
    Given the user is on the registration page
    When the user enters an invalid email "userexample.com" and a valid password "Password123!"
    And the user submits the registration form
    Then the user should see an error message indicating the email is invalid

  Scenario: Registration fails with password not meeting requirements
    Given the user is on the registration page
    When the user enters a valid email "user@example.com" and an invalid password "pass"
    And the user submits the registration form
    Then the user should see an error message indicating the password criteria

  Scenario: Registration fails with email already in use
    Given the user is on the registration page
    When the user enters an email "existinguser@example.com" that is already registered and a valid password "Password123!"
    And the user submits the registration form
    Then the user should see an error message indicating the email is already registered
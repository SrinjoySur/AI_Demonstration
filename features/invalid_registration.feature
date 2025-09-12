Feature: Account Registration with Invalid Information

  Background:
    Given I am on the Automation Exercise homepage
    When I click on the "Signup / Login" button
    Then I should see the "New User Signup!" section

  Scenario: Registration with invalid email format
    When I enter "John" in the name field
    And I enter "invalid-email" in the email field
    And I click the "Signup" button
    Then I should see an error message about invalid email format

  Scenario: Registration with empty required fields
    When I leave the name field empty
    And I leave the email field empty
    And I click the "Signup" button
    Then I should see validation errors for the empty required fields

  Scenario: Registration with existing email
    When I enter "John" in the name field
    And I enter "existing@example.com" in the email field
    And I click the "Signup" button
    Then I should see the message "Email Address already exist!"

  Scenario: Registration with incomplete account information
    When I enter "John" in the name field
    And I enter "new_user@example.com" in the email field
    And I click the "Signup" button
    And I am redirected to the "ENTER ACCOUNT INFORMATION" page
    And I leave all required fields empty
    And I click the "Create Account" button
    Then I should see validation errors for the empty required fields

  Scenario: Registration with invalid password format
    When I enter "John" in the name field
    And I enter "new_user@example.com" in the email field
    And I click the "Signup" button
    And I am redirected to the "ENTER ACCOUNT INFORMATION" page
    And I enter a password that doesn't meet minimum requirements
    And I fill in all other required fields correctly
    And I click the "Create Account" button
    Then I should see an error message about password requirements

  Scenario: Registration with mismatched password confirmation
    When I enter "John" in the name field
    And I enter "new_user@example.com" in the email field
    And I click the "Signup" button
    And I am redirected to the "ENTER ACCOUNT INFORMATION" page
    And I enter "Password123" in the password field
    And I enter "DifferentPassword123" in the password confirmation field
    And I fill in all other required fields correctly
    And I click the "Create Account" button
    Then I should see an error message about password mismatch
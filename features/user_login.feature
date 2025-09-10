Feature: User Login

  Scenario: User logs in with valid credentials
    Given the user navigates to the login page
    When the user enters valid login details
    And the user clicks the login button
    Then the user should be redirected to the dashboard

  Scenario: User fails to log in with invalid credentials
    Given the user navigates to the login page
    When the user enters invalid login details
    And the user clicks the login button
    Then the user should see an error message "Invalid login details"

  Scenario: User logs out
    Given the user is logged in
    When the user clicks the logout button
    Then the user should be redirected to the login page
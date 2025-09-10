Feature: User Login

  Scenario: Successful login with valid credentials
    Given the login page is displayed
    When I enter a valid username "user@example.com"
    And I enter a valid password "password123"
    And I click the login button
    Then I should be logged in successfully
    And I should see the dashboard page

  Scenario: Login failure due to invalid password
    Given the login page is displayed
    When I enter a valid username "user@example.com"
    And I enter an invalid password "wrongpassword"
    And I click the login button
    Then I should see an error message "Invalid password"

  Scenario: Login failure due to invalid username
    Given the login page is displayed
    When I enter an invalid username "invaliduser@example.com"
    And I enter a valid password "password123"
    And I click the login button
    Then I should see an error message "Invalid username"

  Scenario: Account lockout after multiple failed attempts
    Given the login page is displayed
    When I enter a valid username "user@example.com"
    And I enter an invalid password "wrongpassword" 3 times
    And I enter valid credentials "user@example.com" and "password123"
    And I click the login button
    Then my account should be locked
    And I should see an error message "Your account is locked due to multiple failed login attempts"
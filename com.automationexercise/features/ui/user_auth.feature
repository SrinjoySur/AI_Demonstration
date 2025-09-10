Feature: User Authentication

  Scenario: Successful login
    Given I am on the login page
    When I login with username "testuser" and password "password123"
    Then I should see the logout button
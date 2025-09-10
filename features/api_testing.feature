Feature: API Testing

  Scenario: User views API list
    Given the user navigates to the API testing page
    Then the user should see the list of APIs

  Scenario: User performs API tests
    Given the user navigates to the API testing page
    When the user selects an API to test
    And the user performs the API test
    Then the user should see the API test results
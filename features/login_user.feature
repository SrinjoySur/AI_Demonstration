Feature: User Login
  As a registered user
  I want to log in to the website
  So that I can access my account

  Scenario: Login with correct credentials
    Given I am on the home page
    When I click on the "Signup / Login" button
    Then I should see "Login to your account" section
    When I enter correct email and password
    And I click the "Login" button
    Then I should see "Logged in as" with my username
    
  Scenario: Login with incorrect credentials
    Given I am on the home page
    When I click on the "Signup / Login" button
    Then I should see "Login to your account" section
    When I enter incorrect email and password
    And I click the "Login" button
    Then I should see "Your email or password is incorrect!" error message
    
  Scenario: Logout User
    Given I am logged in to the website
    When I click on the "Logout" button
    Then I should be redirected to the login page
    And I should not see "Logged in as" with my username
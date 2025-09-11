Feature: Password Reset

  Scenario: Requesting a password reset link with valid email
    Given the user is on the password reset page
    When the user enters a valid email "user@example.com"
    And the user submits the password reset request
    Then the user should receive a password reset link via email

  Scenario: Requesting a password reset link with invalid email
    Given the user is on the password reset page
    When the user enters an invalid email "userexample.com"
    And the user submits the password reset request
    Then the user should see an error message indicating the email is invalid

  Scenario: Setting a new password with valid reset link
    Given the user has received a valid password reset link
    When the user clicks the link within the valid time frame
    And the user sets a new password "NewPassword123!"
    Then the user should be able to log in with the new password

  Scenario: Attempting to use an expired password reset link
    Given the user has received an expired password reset link
    When the user clicks the link after it has expired
    Then the user should see a message indicating the link is expired
    And the user should be prompted to request a new link
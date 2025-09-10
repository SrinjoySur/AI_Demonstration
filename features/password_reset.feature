Feature: Password Reset

  Scenario: Successful password reset request with valid email
    Given the user is on the password reset page
    When the user enters a valid email
    And the user submits the password reset request
    Then the user should receive a password reset link via email

  Scenario: Password reset request failure due to invalid email
    Given the user is on the password reset page
    When the user enters an invalid email
    And the user submits the password reset request
    Then the user should see an error message indicating the email is not registered

  Scenario: Successful password reset using the reset link
    Given the user has received the password reset email
    When the user clicks the reset link
    Then the user should be directed to a page to enter a new password

  Scenario: Successful password update with valid new password
    Given the user is on the password reset page
    When the user enters a new password that meets the requirements
    And the user submits the password reset form
    Then the user's password should be successfully updated
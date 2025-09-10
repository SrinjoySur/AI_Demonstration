Feature: Contact Form

  Scenario: User submits contact form
    Given the user navigates to the contact us page
    When the user enters contact details
    And the user clicks the submit button
    Then the user should see a success message
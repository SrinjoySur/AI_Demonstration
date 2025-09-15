Feature: Contact Form
  As a user
  I want to contact the website administrators
  So that I can get help or provide feedback

  Background:
    Given I am on the AutomationExercise website

  @smoke @contact
  Scenario: User can submit contact form successfully
    Given I navigate to the contact us page
    When I fill in the contact form:
      | name    | John Doe                    |
      | email   | john.doe@example.com        |
      | subject | Product Inquiry             |
      | message | I need help with my order   |
    And I click submit
    Then I should see success message "Success! Your details have been submitted successfully."

  @contact
  Scenario: User can submit contact form with file attachment
    Given I navigate to the contact us page
    When I fill in the contact form with valid details
    And I attach a file "test-document.pdf"
    And I click submit
    Then I should see success message
    And the form should be submitted with attachment

  @contact @negative
  Scenario: Contact form validation for required fields
    Given I navigate to the contact us page
    When I submit the form without filling required fields
    Then I should see validation errors for:
      | field   |
      | name    |
      | email   |
      | subject |
      | message |

  @contact @negative
  Scenario: Contact form validation for invalid email
    Given I navigate to the contact us page
    When I fill in the contact form with invalid email "invalid-email"
    And I click submit
    Then I should see email validation error

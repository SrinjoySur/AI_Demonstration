Feature: Contact Form
  As a user
  I want to contact the website administrators
  So that I can get support or provide feedback

  Background:
    Given I am on the AutomationExercise homepage

  @smoke @contact
  Scenario: Submit contact form successfully
    Given I navigate to the contact us page
    When I fill in the contact form:
      | name     | email                | subject      | message                    |
      | John Doe | john.doe@email.com   | Test Subject | This is a test message     |
    And I upload a file "test-file.txt"
    And I click "Submit"
    Then I should see "Success! Your details have been submitted successfully." message

  @contact @validation
  Scenario: Submit contact form with missing required fields
    Given I navigate to the contact us page
    When I fill in the contact form with missing fields:
      | name | email | subject | message |
      |      |       |         |         |
    And I click "Submit"
    Then I should see validation error messages

  @contact @file
  Scenario: Submit contact form with file attachment
    Given I navigate to the contact us page
    When I fill in the contact form completely
    And I upload a file "document.pdf"
    And I click "Submit"
    Then the form should be submitted successfully
    And the file should be attached

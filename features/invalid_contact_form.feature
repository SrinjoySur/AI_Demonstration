Feature: Contact Form Validation

  Background:
    Given I am on the Automation Exercise homepage
    When I click on the "Contact us" button
    Then I should see the "GET IN TOUCH" section

  Scenario: Contact form with empty name field
    When I leave the contact name field empty
    And I enter "test@example.com" in the contact email field
    And I enter "Test Subject" in the contact subject field
    And I enter "This is a test message" in the contact message field
    And I click the "Submit" button
    Then I should see a validation error for the empty name field

  Scenario: Contact form with invalid email format
    When I enter "John Doe" in the contact name field
    And I enter "invalid-email" in the contact email field
    And I enter "Test Subject" in the contact subject field
    And I enter "This is a test message" in the contact message field
    And I click the "Submit" button
    Then I should see an error message about invalid email format in the contact form

  Scenario: Contact form with empty subject field
    When I enter "John Doe" in the contact name field
    And I enter "test@example.com" in the contact email field
    And I leave the contact subject field empty
    And I enter "This is a test message" in the contact message field
    And I click the "Submit" button
    Then I should see a validation error for the empty subject field

  Scenario: Contact form with empty message field
    When I enter "John Doe" in the contact name field
    And I enter "test@example.com" in the contact email field
    And I enter "Test Subject" in the contact subject field
    And I leave the contact message field empty
    And I click the "Submit" button
    Then I should see a validation error for the empty message field

  Scenario: Contact form with all fields empty
    When I leave the contact name field empty
    And I leave the contact email field empty
    And I leave the contact subject field empty
    And I leave the contact message field empty
    And I click the "Submit" button
    Then I should see validation errors for all empty contact form fields
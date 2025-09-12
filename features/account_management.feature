Feature: Account Management
  As a registered user
  I want to manage my account
  So that I can update my information and view my orders

  Background:
    Given I am on the Automation Exercise homepage

  Scenario: Delete Account
    Given I am logged in with valid credentials
    When I click on "Delete Account" button
    Then I should see "ACCOUNT DELETED!" message
    And I click "Continue" button
    Then I should be redirected to the homepage

  Scenario: Update Account Information
    Given I am logged in with valid credentials
    When I navigate to my account page
    And I update the following information:
      | First name | Updated |
      | Last name  | User    |
      | Address    | 456 New Street |
    And I click "Update" button
    Then I should see "Your account has been updated successfully" message

  Scenario: View Order History
    Given I am logged in with valid credentials
    When I navigate to "Orders" page
    Then I should see my order history
    And I should see details of each order including:
      | Order ID |
      | Date     |
      | Amount   |
      | Status   |

  Scenario: Download Invoice
    Given I am logged in with valid credentials
    And I have placed at least one order
    When I navigate to "Orders" page
    And I click "Download Invoice" button for my latest order
    Then the invoice should be downloaded successfully
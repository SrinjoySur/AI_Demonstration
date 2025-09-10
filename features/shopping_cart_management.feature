Feature: Shopping Cart Management

  Scenario: Adding an item to the shopping cart
    Given the user is on the product page
    When the user adds the item to the cart
    Then the item should be listed in the shopping cart

  Scenario: Removing an item from the shopping cart
    Given the user is on the shopping cart page
    When the user removes the item from the cart
    Then the item should no longer be listed in the shopping cart

  Scenario: Updating the quantity of an item in the shopping cart
    Given the user is on the shopping cart page
    When the user updates the quantity of the item to "2"
    Then the shopping cart should reflect the updated quantity and total price

  Scenario: Applying a discount code to the shopping cart
    Given the user is on the shopping cart page
    When the user applies a valid discount code "DISCOUNT10"
    Then the total price should be updated to reflect the discount
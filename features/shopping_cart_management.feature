Feature: Shopping Cart Management

  Scenario: Adding an item to the shopping cart
    Given the user is on the product page
    When the user adds an item to the cart
    Then the item should appear in the cart with the correct quantity

  Scenario: Removing an item from the shopping cart
    Given the user is on the shopping cart page
    When the user removes an item from the cart
    Then the item should be removed and the cart updated

  Scenario: Updating the quantity of an item in the shopping cart
    Given the user is on the shopping cart page
    When the user updates the quantity of an item
    Then the cart should reflect the new quantity and update the total price

  Scenario: Applying a discount code to the shopping cart
    Given the user is on the shopping cart page
    When the user applies a discount code
    Then the total price should be updated to reflect the discount
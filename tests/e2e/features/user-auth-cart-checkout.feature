Feature: User authentication, shopping cart, and checkout flows

  @auth @happy-path @US-Login
  Scenario: Successful login with valid credentials
    Given a registered user exists with email "alice@example.com" and password "CorrectPass123"
    And the user is on the login page
    When the user enters email "alice@example.com" and password "CorrectPass123" and submits the form
    Then the user is redirected to the dashboard
    And a valid authenticated session is established
    And the header displays "Welcome, Alice"

  @auth @negative @US-Login
  Scenario: Login fails with incorrect password
    Given a registered user exists with email "alice@example.com" and password "CorrectPass123"
    And the user is on the login page
    When the user enters email "alice@example.com" and password "WrongPass!" and submits the form
    Then an error message "Incorrect email or password" is shown
    And the user remains on the login page
    And no authenticated session is created
    And the "Forgot password?" link is visible

  @cart @happy-path @US-Cart-Add
  Scenario: Add an in-stock item to the cart updates quantity and subtotal
    Given a product "Wireless Mouse" exists with unit price 25.00 and available stock 10
    And the user is viewing the product detail page for "Wireless Mouse"
    And the shopping cart is empty
    When the user clicks "Add to cart"
    And the user clicks "Add to cart" again
    Then the cart badge shows "2"
    And the cart lists "Wireless Mouse" with quantity 2 and line total 50.00
    And the cart subtotal is 50.00

  @checkout @negative @US-Checkout
  Scenario: Checkout fails with expired payment card
    Given the user is logged in as "alice@example.com"
    And the shopping cart contains "Wireless Mouse" with quantity 1 and unit price 25.00
    And the user is on the checkout page with a valid shipping address entered
    When the user submits payment with card number "4111111111111111" expiration "01/20" and CVV "123"
    Then a payment error "Card expired" is displayed
    And no order is created
    And the user remains on the checkout page
    And the shopping cart contents are unchanged
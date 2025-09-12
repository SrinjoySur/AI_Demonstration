# Automation Exercise Test Suite

This directory contains BDD-style test features for the [Automation Exercise](https://automationexercise.com/) website.

## Features

- **User Registration**: Tests for user registration functionality
- **Password Reset**: Tests for password reset functionality
- **Product Search Filtering**: Tests for product search and filtering
- **Shopping Cart Management**: Tests for shopping cart operations
- **Home Page Edge Cases**: Tests for edge cases on the home page

## Home Page Edge Cases

The `home_page_edge_cases.feature` file contains tests for various edge cases on the home page, including:

1. **Network Connectivity**: Testing how the page loads under poor network conditions
2. **Viewport Responsiveness**: Testing the page at extreme viewport sizes
3. **Ad Blocker Compatibility**: Testing how the page behaves with ad blockers enabled
4. **Performance with Maximum Load**: Testing performance when all products are loaded
5. **Accessibility**: Testing screen reader compatibility
6. **JavaScript Disabled**: Testing functionality when JavaScript is disabled
7. **Special Characters in Search**: Testing how the search handles special characters
8. **Cache Behavior**: Testing how the page uses browser caching

## Running Tests

To run all tests:

```bash
npm test
```

To run only home page edge cases tests:

```bash
npm run test:home
```

## Generating Reports

To generate HTML reports after running tests:

```bash
npm run report
```

## Page Objects

The tests use a Page Object Model pattern. The `page_objects` directory contains classes that represent pages on the website, encapsulating the page's elements and actions.

## Support Files

The `support` directory contains:

- **World**: Custom world setup for Cucumber
- **Hooks**: Before and After hooks for test setup and teardown
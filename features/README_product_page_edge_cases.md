# Product Page Edge Cases Testing

This directory contains automated tests for edge cases on the products page of the Automation Exercise website.

## Overview

These tests focus on edge cases and boundary conditions for the products page functionality, including:

- Search functionality with various input types
- Category and brand filtering combinations
- Product viewing with extreme content
- Rapid interactions with the UI
- Cart operations with edge conditions
- Pagination edge cases

## Test Files

- `product_page_edge_cases.feature`: Contains the Gherkin scenarios for product page edge cases
- `step_definitions/product_page_edge_cases_steps.js`: Contains the step definitions for the scenarios
- `support/product_page_helpers.js`: Contains helper functions for the tests
- `support/product_page_config.js`: Contains configuration for the tests

## Running the Tests

To run these tests, use the following command:

```bash
npx cucumber-js features/product_page_edge_cases.feature
```

To run with specific tags:

```bash
npx cucumber-js --tags "@search or @filter" features/product_page_edge_cases.feature
```

## Test Categories

The tests are organized into the following categories:

1. **Search Functionality**: Tests for search with various input types, including single characters, special characters, extremely long search terms, and non-existent products.

2. **Category Filtering**: Tests for filtering by multiple categories, empty categories, and combinations of filters.

3. **Product Viewing**: Tests for viewing products with extreme content, such as very long descriptions or names.

4. **Rapid Interactions**: Tests for rapid clicking and interactions with the UI to ensure stability.

5. **Cart Operations**: Tests for edge cases in cart operations, such as adding the same product multiple times rapidly.

6. **Pagination**: Tests for pagination edge cases, such as navigating to the last page with fewer products and filtering while on a non-first page.

## Edge Cases Covered

- Single character search
- Special character search
- Extremely long search terms
- Non-existent product search
- Multiple category selection
- Empty category filtering
- Multiple filter type application
- Extremely long product text
- Rapid UI interactions
- Multiple rapid cart additions
- Last page with fewer products
- Filtering from non-first page

## Notes

- Some edge cases may not be directly supported by the application (e.g., multiple category selection). In these cases, the tests verify that the application handles the edge case gracefully without crashing.
- The tests use Playwright for browser automation and Cucumber.js for BDD-style testing.
- Helper functions are provided to assist with common operations and to make the tests more readable and maintainable.
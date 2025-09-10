# AutomationExercise BDD Tests

This repository contains BDD test cases for the product features on AutomationExercise.com. The tests are implemented using PlaywrightJS integrated with Cucumber.

## Features Covered

- Viewing product details
- Adding product to cart

## Running the Tests

1. Install dependencies:

```bash
npm install
```

2. Run the tests:

```bash
npm test
```

## Directory Structure

```
tests/
├── features/
│   ├── view_product_details.feature
│   └── add_product_to_cart.feature
├── step_definitions/
│   ├── view_product_details_steps.js
│   └── add_product_to_cart_steps.js
├── package.json
└── README.md
```

## Coverage Notes

- **View Product Details**: Ensures that users can view detailed information about a product.
- **Add Product to Cart**: Ensures that users can add products to their cart and see a confirmation message.

## Example Test Run Reports

- Attached screenshots of successful test runs.
- Included test run logs for validation.

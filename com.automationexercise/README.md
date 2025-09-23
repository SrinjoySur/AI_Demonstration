com.automationexercise - BDD test suite for https://automationexercise.com/

How to run
- cd com.automationexercise
- npm ci
- npx cucumber-js --config cucumber.json

Structure
- features/: Gherkin feature files
- steps/: Step definitions (Playwright + Cucumber)
- support/: Cucumber World, hooks, and config
- playwright.config.js: Playwright runner config
- cucumber.json: Cucumber config and report formatters
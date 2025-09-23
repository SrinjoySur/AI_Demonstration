# End-to-end tests with Playwright (@playwright/test)

This folder contains minimal Playwright E2E test skeletons based strictly on provided Gherkin scenarios. Environment-specific values (URLs, selectors, cookie names) must be filled by implementers.

Key guidance followed:
- Use accessible selectors where possible: `page.getByRole`, `page.getByLabel`, `page.getByPlaceholder`, and robust text checks.
- Verify authentication via `context.cookies()` where applicable.
- Include `test.step` wrappers and clear `expect()` messages for stability and readability.
- Target site for execution and discovery: https://automationexercise.com/
- Leave TODOs where selectors/URLs/cookie names are unknown; do not invent app-specific values.

How to run
1. Install Playwright and dependencies in the repo root or in the test project folder (if not already present):
   - npm install --save-dev @playwright/test
   - npx playwright install

2. Execute tests (uses default Playwright project configuration if present, otherwise Playwright defaults):
   - npx playwright test
   - Use `--ui` or `--headed` as needed, e.g., `npx playwright test --headed`.

3. Stabilization guidance
   - Prefer accessible queries (getByRole/getByLabel), URL checks after navigation, and explicit assertions such as `await expect(locator).toBeVisible()`.
   - Use `test.step` to make test intent clear and aid debugging.
   - For authentication, verify via `await context.cookies()` and assert the auth/session cookie existence as appropriate.
   - If checkout uses hosted payment forms/iframes, handle frame navigation carefully or mock/stub if unsupported in the environment.
   - For email or inventory verifications, prefer API checks or a mocked mailbox when available; otherwise, leave TODOs.

Notes
- These tests are intentionally generic and must be adapted to the target application's actual DOM and flows.
- Do not add or invent app-specific selectors; perform discovery and replace the TODOs accordingly.

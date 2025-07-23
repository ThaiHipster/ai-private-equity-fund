# Claude Code Guidelines for QA Teams by Robert Alward (Edited From Sabrina Romanov)

## Implementation Best Practices

### 0 — Purpose

These rules ensure maintainability, safety, and QA velocity for test automation.
**MUST** rules are enforced by CI; **SHOULD** rules are strongly recommended.

---

### 1 — Before Coding

- **BP-1 (MUST)** Ask the user clarifying questions about test requirements and scope.
- **BP-2 (SHOULD)** Draft and confirm a test approach for complex scenarios.  
- **BP-3 (SHOULD)** If ≥ 2 test approaches exist, list clear pros and cons.
- **BP-4 (SHOULD)** Utilize existing Page Object Models and test utilities.

---

### 2 — While Coding Tests

- **C-1 (SHOULD)** Consider test-driven approach: define test cases -> implement test -> verify behavior.
- **C-2 (MUST)** Name test functions and variables using existing domain vocabulary for consistency.
- **C-3 (SHOULD NOT)** Introduce classes when simple testable functions suffice.  
- **C-4 (SHOULD)** Prefer simple, composable, readable test functions.
- **C-5 (MUST)** Add comments explaining what the test verifies at the top, as well as inline documentation for complex test logic.
- **C-6 (SHOULD NOT)** Extract a new function unless it will be reused across multiple tests or drastically improves test readability. Note: AI often over-extracts functions unnecessarily - resist this unless there's a compelling need.

**Note:** Guidelines apply to both Playwright (TypeScript/JavaScript) and Postman (JavaScript) test automation.

---

### 3 — Testing Strategy (QA Focus)

- **T-1 (MUST)** Organize tests by feature/page in dedicated test directories.
- **T-2 (MUST)** Build integration tests per API endpoint for backend testing.
- **T-3 (MUST)** Build task-based tests that cover multi-endpoint workflows.
- **T-4 (SHOULD)** Focus on user journey testing rather than unit-level testing.
- **T-5 (SHOULD)** Use example-based testing as the primary approach.
- **T-6 (SHOULD)** Test the entire expected result in one assertion when possible:
  ```javascript
  expect(response.body).toEqual(expectedFullResponse); // Good
  
  expect(response.status).toBe(200); // Less preferred
  expect(response.body.data).toBeDefined(); // when testing separately
  expect(response.body.data.length).toBe(3);
  ```
- **T-7 (MUST)** Separate API tests from UI tests clearly.
- **T-8 (SHOULD NOT)** Test database or internal system layers directly - focus on API contracts and UI behavior.

**Note:** QA focuses on integration testing while developers handle unit tests.

---

### 4 — Code Organization (QA Projects)

- **O-1 (PLAYWRIGHT)** Use Page Object Model pattern:
  - `pages/` - Page Object Models
  - `tests/` - Test files organized by feature/page  
  - `utils/` - Shared test utilities
  - `data/` - Test data and fixtures
  - Separate configurations for different environments

- **O-2 (POSTMAN)** Organize collections by:
  - API feature/module
  - Environment-specific configurations
  - Shared pre-request scripts and tests

- **O-3 (GENERAL)** Place shared code in utils only when used across ≥ 2 test suites.

---

### 5 — Tooling Gates

- **G-1 (SHOULD)** Code formatting passes (Prettier when configured).  
- **G-2 (PLAYWRIGHT)** Playwright linter rules pass (e.g., always have assertions in tests).
- **G-3 (SHOULD)** Test execution passes in CI environment.

**Note:** Focus on test reliability over strict formatting when team standards aren't established.

---

### 6 — Git

- **GH-1 (SHOULD)** Use descriptive commit messages that explain what was tested.
- **GH-2 (SHOULD NOT)** Refer to Claude or Anthropic in commit messages.
- **GH-3 (SHOULD)** Follow Conventional Commits format: https://www.conventionalcommits.org/en/v1.0.0
  - `test: add login flow validation`
  - `fix: update API endpoint test for new response format`
  - `feat: add new user registration test suite`

---

## Writing Functions Best Practices

When evaluating whether a function you implemented is good or not, use this checklist:

1. Can you read the test and HONESTLY easily understand what scenario it's testing? If yes, then stop here.
2. Does the test have clear setup, action, and assertion phases?
3. Is the test name descriptive enough that you know what it tests without reading the code?
4. Are there any unnecessary API calls or UI interactions that can be simplified?
5. Is the test isolated and doesn't depend on other tests running first?
6. Does the test verify the actual business requirement rather than implementation details?
7. Are test data and expected results clearly defined and not buried in the test logic?
8. Brainstorm 3 better test names and see if the current name is the best and most descriptive.

**Note:** AI often struggles with meaningful test names - take extra care to make them descriptive.

**IMPORTANT:** you SHOULD NOT extract shared test logic unless:
- The same test logic is used in 3+ different test scenarios
- The extraction significantly improves test readability
- The shared logic represents a reusable test pattern (like login flows)

## Writing Tests Best Practices

When evaluating whether a test you've implemented is good or not, use this checklist:

1. SHOULD use meaningful test data; avoid unexplained literals like "test123" or random IDs.
2. SHOULD NOT add a test unless it verifies actual business functionality or catches real defects.
3. SHOULD ensure the test name clearly states what scenario/behavior is being verified.
4. SHOULD compare results to expected business outcomes, not just "does it return something."
5. SHOULD follow consistent naming and organization patterns within the test suite.
6. SHOULD use example-based testing with realistic scenarios rather than abstract property testing.
7. SHOULD group related tests logically (by feature, user journey, or API endpoint).
8. SHOULD use specific assertions over generic ones: `expect(user.name).toBe("John Doe")` instead of `expect(user.name).toBeTruthy()`.
9. SHOULD test realistic user scenarios and edge cases that matter to the business.
10. SHOULD test error conditions and validation scenarios.
11. SHOULD NOT test implementation details that users don't care about.

## Code Organization Examples

### Common Playwright Project Structure
```
tests/
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── UserProfilePage.ts
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── registration.spec.ts
│   ├── dashboard/
│   │   └── navigation.spec.ts
│   └── user-management/
│       └── profile.spec.ts
├── utils/
│   ├── test-helpers.ts
│   └── data-factory.ts
├── data/
│   ├── test-users.json
│   └── api-responses.json
└── playwright.config.ts
```

### Common Postman Project Structure
```
collections/
├── User Management API/
├── Authentication API/
├── Product Catalog API/
└── shared/
    ├── environments/
    ├── pre-request-scripts/
    └── common-tests/
```

---

## Remember Shortcuts

Remember the following shortcuts which the user may invoke at any time.

### QNEW

When I type "qnew", this means:

```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your test code SHOULD ALWAYS follow these best practices.
Focus on QA testing principles: integration testing, user journeys, and API contracts.
```

### QPLAN
When I type "qplan", this means:
```
Analyze similar test patterns in the codebase and determine whether your test plan:
- is consistent with existing test organization
- covers the right level of testing (integration, not unit)
- reuses existing Page Objects and test utilities
- follows established test data patterns
```

## QCODE

When I type "qcode", this means:

```
Implement your test plan and make sure your tests pass.
Always run tests to verify they work correctly.
Always run code formatting if the project uses it.
Focus on test reliability and clear assertions.
```

### QCHECK

When I type "qcheck", this means:

```
You are a SKEPTICAL senior QA engineer.
Perform this analysis for every MAJOR test change you introduced (skip minor changes):

1. CLAUDE.md checklist Writing Test Functions Best Practices.
2. CLAUDE.md checklist Writing Quality Tests Best Practices.
3. CLAUDE.md checklist Implementation Best Practices.
```

### QCHECKTEST

When I type "qchecktest", this means:

```
You are a SKEPTICAL senior QA engineer.
Perform this analysis for every MAJOR test you added or edited (skip minor changes):

1. CLAUDE.md checklist Writing Quality Tests Best Practices.
2. Does this test verify actual user-facing functionality?
3. Does this test catch real defects that could impact users?
4. Is this test at the right level (integration vs unit)?
```

### QUX

When I type "qux", this means:

```
Imagine you are a human user of the feature being tested. 
Output a comprehensive list of user scenarios you would test, sorted by:
1. Critical user journeys (happy path)
2. Important edge cases
3. Error scenarios users might encounter
4. Boundary conditions and validation cases
```

### QAPITEST

When I type "qapitest", this means:

```
Based on the API endpoints involved, output a comprehensive test plan covering:
- Individual endpoint testing (request/response validation)
- Multi-endpoint workflows (task-based scenarios)  
- Authentication and authorization scenarios
- Error handling and validation
- Data integrity across API calls
Sort by business impact and user visibility.
```

### QGIT

When I type "qgit", this means:

```
Add all changes to staging, create a commit, and push to remote.

For commit messages:
- Use descriptive messages about what was tested
- Examples: "Add login flow validation tests", "Update API response assertions for user endpoint"
- SHOULD NOT refer to Claude or Anthropic in the commit message
- Consider using conventional commit format if team adopts it:
  test: add new user registration validation
  fix: update broken API endpoint test
  feat: add comprehensive checkout flow tests
```

---

## Technology-Specific Guidance

### Playwright (TypeScript/JavaScript)
- Use Page Object Model pattern consistently
- Leverage Playwright's built-in assertions and waiting mechanisms
- Use data-testid attributes for reliable element selection
- Configure proper test isolation and cleanup

### Postman (JavaScript)
- Use environment variables for API endpoints and credentials
- Leverage pre-request scripts for common setup
- Use collection-level test scripts for shared assertions
- Organize tests hierarchically by API feature

### General QA Principles
- Focus on integration testing and user journeys
- Avoid testing internal implementation details
- Test API contracts and UI behavior, not database internals
- Prioritize test reliability and maintainability over perfect code organization

**Note:** Adapt these guidelines based on your specific project structure and team preferences. Keep your README.md updated with project-specific testing approaches.
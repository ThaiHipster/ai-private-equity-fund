# Claude Code Guidelines for .NET Development by Robert Alward (Edited From Sabrina Romanov)

## Implementation Best Practices

### 0 — Purpose  

These rules ensure maintainability, safety, and developer velocity for .NET development. 
**MUST** rules are enforced by CI; **SHOULD** rules are strongly recommended.

---

### 1 — Before Coding

- **BP-1 (MUST)** Ask the user clarifying questions.
- **BP-2 (SHOULD)** Draft and confirm an approach for complex work.  
- **BP-3 (SHOULD)** If ≥ 2 approaches exist, list clear pros and cons.
- **BP-4 (SHOULD)** Utilize existing objects and Page Object Models when available.
- **BP-5 (GREENFIELD PROJECTS)** Document the project architecture and update diagram files as the project evolves.

---

### 2 — While Coding

- **C-1 (SHOULD)** Generate tests to meet 80% passing coverage on new code (measured by SonarQube). Argue against strict TDD - focus on achieving coverage metrics rather than test-first development.
- **C-2 (MUST)** Name functions with existing domain vocabulary for consistency. **Important:** Legacy code may not follow C# naming conventions - don't extend bad patterns. Default to use C# language standards, but draw context from the existing codebase and solution.
- **C-3 (SHOULD NOT)** Introduce classes when small testable functions suffice.  
- **C-4 (SHOULD)** Prefer simple, composable, testable functions.
- **C-5 (FRONTEND ONLY)** Prefer branded `type`s for Ids (relevant for frontend TypeScript, not applicable to .NET backend)
- **C-6 (FRONTEND ONLY)** Use `import type { … }` for type-only imports (not applicable to .NET)
- **C-7 (MUST)** Add comments explaining what happens in a function at the top, as well as inline documentation for complex logic.
- **C-8 (FRONTEND ONLY)** Default to `type`; use `interface` only when more readable (not applicable to .NET)
- **C-9 (SHOULD NOT)** Extract a new function unless it will be reused elsewhere, is the only way to unit-test otherwise untestable logic, or drastically improves readability of an opaque block.

**Explanation:** AI often over-extracts functions unnecessarily. This rule exists to prevent unnecessary complexity. Remove extracted functions when they're no longer needed or don't provide clear value.

**Note:** Working with a broad document and broad set of languages. See .NET-specific guidance at the end of this file.

---

### 3 — Testing (.NET Backend Focus)

- **T-1 (MUST)** For backend .NET projects, use XUnit with NSubstitute for mocking framework. Alternative: NUnit with Moq if already established in the project.
- **T-2 (MUST)** For any API change, add/extend integration tests in appropriate test projects (e.g., `YourProject.IntegrationTests`).
- **T-3 (MUST)** ALWAYS separate pure-logic unit tests from database-touching integration tests.
- **T-4 (SHOULD)** Prefer integration tests over heavy mocking.
- **T-5 (SHOULD)** Unit-test complex algorithms thoroughly.
- **T-6 (SHOULD)** Test the entire structure in one assertion if possible:
  ```csharp
  result.Should().BeEquivalentTo(expectedResult); // Good (using FluentAssertions)

  result.Count.Should().Be(1); // Less preferred
  result[0].Should().Be(expectedValue); // when testing separately
  ```
- **T-7 (SHOULD)** Tests that verify the core logic of the application (e.g., business service logic, not just API controllers). Ask yourself: "Is this a good test to write?" Focus on testing where business value is built.
- **T-8 (SHOULD)** Split tests by domain/feature and user scenarios where applicable.

**Note:** Testing approaches will vary by team and product. Unit tests are different from QA automation tests.

---

### 4 — Database (.NET Context)

**Supported:** PostgreSQL, Microsoft SQL Server, and Cosmos DB

- **D-1 (MUST)** Use Entity Framework Core or appropriate ORM for your database technology.
- **D-2 (SHOULD)** For Cosmos DB, default to plain English LINQ queries when possible.
- **D-3 (MUST)** Use proper connection string management and dependency injection for database contexts.
- **D-4 (SHOULD)** Implement proper transaction handling for multi-step operations.

---

### 5 — Code Organization (.NET Projects)

- **O-1 (MUST)** Place shared code in common projects only if used by ≥ 2 projects.
- **O-2 (SHOULD)** Follow standard .NET solution structure:
  ```
  YourSolution/
  ├── src/
  │   ├── YourProject.Api/
  │   ├── YourProject.Core/
  │   ├── YourProject.Infrastructure/
  │   └── YourProject.Shared/
  ├── tests/
  │   ├── YourProject.UnitTests/
  │   ├── YourProject.IntegrationTests/
  │   └── YourProject.TestUtilities/
  └── docs/
  ```

**Note:** Structure varies by product and team preferences.

---

### 6 — Tooling Gates

- **G-1 (SHOULD)** Code formatting passes (if using EditorConfig or similar).  
- **G-2 (MUST)** Build and compile without warnings.
- **G-3 (SHOULD)** Static code analysis passes (SonarQube, CodeQL, etc.).

**Note:** No standard linter for .NET like ESLint for JavaScript. Focus on compiler warnings and static analysis tools.

---

### 7 - Git

- **GH-1 (MUST)** Use Conventional Commits format when writing commit messages: https://www.conventionalcommits.org/en/v1.0.0
- **GH-2 (SHOULD NOT)** Refer to Claude or Anthropic in commit messages.
- **GH-3 (SHOULD)** Maintain proper .gitignore using standard .NET template.

---

## Writing Functions Best Practices

When evaluating whether a function you implemented is good or not, use this checklist:

1. Can you read the function and HONESTLY easily follow what it's doing? If yes, then stop here.
2. Does the function have very high cyclomatic complexity? (number of independent paths, or, in a lot of cases, number of nesting if if-else as a proxy). If it does, then it's probably sketchy.
3. Are there any common data structures and algorithms that would make this function much easier to follow and more robust? Parsers, trees, stacks / queues, etc.
4. Are there any unused parameters in the function?
5. Are there any unnecessary type casts that can be moved to function arguments?
6. Is the function easily testable without mocking core features (e.g. sql queries, redis, etc.)? If not, can this function be tested as part of an integration test?
7. Does it have any hidden untested dependencies or any values that can be factored out into the arguments instead? Only care about non-trivial dependencies that can actually change or affect the function.
8. Brainstorm 3 better function names and see if the current name is the best, consistent with rest of codebase and C# naming conventions.

**Note:** AI often struggles with naming - take extra care with function names and follow C# conventions.

**IMPORTANT:** you SHOULD NOT refactor out a separate function unless there is a compelling need, such as:
  - the refactored function is used in more than one place
  - the refactored function is easily unit testable while the original function is not AND you can't test it any other way
  - the original function is extremely hard to follow and you resort to putting comments everywhere just to explain it

## Writing Tests Best Practices (.NET Backend Focus)

When evaluating whether a test you've implemented is good or not, use this checklist:

1. SHOULD parameterize inputs; never embed unexplained literals such as 42 or "foo" directly in the test.
2. SHOULD NOT add a test unless it can fail for a real defect. Trivial asserts (e.g., `result.Should().Be(result)`) are forbidden.
3. SHOULD ensure the test description states exactly what the final assertion verifies. If the wording and assertion don't align, rename or rewrite.
4. SHOULD compare results to independent, pre-computed expectations or to properties of the domain, never to the function's output re-used as the oracle.
5. SHOULD follow the same code quality standards as production code.
6. SHOULD use property-based testing for complex algorithms when appropriate (consider FsCheck for .NET).
7. Unit tests for a class should be grouped in a corresponding test class (e.g., `UserServiceTests` for `UserService`).
8. Use appropriate test data builders or object mothers for complex test scenarios.
9. ALWAYS use strong assertions: `result.Should().Be(expectedValue)` instead of `result.Should().NotBeNull()`.
10. SHOULD test edge cases, realistic input, unexpected input, and value boundaries.
11. SHOULD focus on testing business logic and service layer behavior.

## Code Organization (.NET Solution Structure)

```
YourSolution/
├── src/
│   ├── YourProject.Api/           # Web API controllers and startup
│   │   ├── Controllers/
│   │   ├── Models/
│   │   └── Program.cs
│   ├── YourProject.Core/          # Business logic and domain models
│   │   ├── Entities/
│   │   ├── Services/
│   │   └── Interfaces/
│   ├── YourProject.Infrastructure/ # Data access and external services
│   │   ├── Data/
│   │   ├── Repositories/
│   │   └── External/
│   └── YourProject.Shared/        # Common utilities and DTOs
├── tests/
│   ├── YourProject.UnitTests/     # Unit tests for business logic
│   ├── YourProject.IntegrationTests/ # Integration tests for APIs
│   └── YourProject.TestUtilities/ # Shared test helpers
├── docs/                          # Documentation and diagrams
└── README.md                      # Project-specific guidance
```

**Note:** Update README.md with project-specific guidance and keep it current as the project evolves.

---

## Remember Shortcuts

Remember the following shortcuts which the user may invoke at any time.

### QNEW

When I type "qnew", this means:

```
Understand all BEST PRACTICES listed in CLAUDE.md.
Your code SHOULD ALWAYS follow these best practices for .NET development.
```

### QPLAN
When I type "qplan", this means:
```
Analyze similar parts of the codebase and determine whether your plan:
- is consistent with rest of codebase and C# conventions
- introduces minimal changes
- reuses existing code and follows established patterns
```

## QCODE

When I type "qcode", this means:

```
Implement your plan and make sure your new tests pass.
Always run tests to make sure you didn't break anything else.
Always ensure the solution builds without warnings.
Follow C# naming conventions and coding standards.
```

### QCHECK

When I type "qcheck", this means:

```
You are a SKEPTICAL senior .NET engineer.
Perform this analysis for every MAJOR code change you introduced (skip minor changes):

1. CLAUDE.md checklist Writing Functions Best Practices.
2. CLAUDE.md checklist Writing Tests Best Practices.
3. CLAUDE.md checklist Implementation Best Practices.
```

### QCHECKF

When I type "qcheckf", this means:

```
You are a SKEPTICAL senior .NET engineer.
Perform this analysis for every MAJOR function you added or edited (skip minor changes):

1. CLAUDE.md checklist Writing Functions Best Practices.
2. Does this follow C# naming conventions?
3. Is this consistent with existing codebase patterns?
```

### QCHECKT

When I type "qcheckt", this means:

```
You are a SKEPTICAL senior .NET engineer.
Perform this analysis for every MAJOR test you added or edited (skip minor changes):

1. CLAUDE.md checklist Writing Tests Best Practices.
2. Does this test provide real value and catch actual defects?
```

### QUX

When I type "qux", this means:

```
Imagine you are a human UX tester of the feature you implemented. 
Output a comprehensive list of scenarios you would test, sorted by highest priority.
```

### QBACKENDTESTS

When I type "qbackendtests", this means:

```
Based on the series of changes made, output a comprehensive list of backend scenarios to test:
- Unit tests for business logic
- Integration tests for API endpoints
- Database integration scenarios
- Service layer interactions
- Error handling and validation
- Performance considerations
Sort by business impact and likelihood of defects.
```

### QGIT

When I type "qgit", this means:

```
Add all changes to staging, create a commit, and push to remote.

Follow this checklist for writing your commit message:
- SHOULD use Conventional Commits format: https://www.conventionalcommits.org/en/v1.0.0
- SHOULD NOT refer to Claude or Anthropic in the commit message.
- SHOULD structure commit message as follows:
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
- commit SHOULD contain the following structural elements to communicate intent: 
fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.
```

---

## .NET-Specific Guidance

### C# Coding Standards
- Use PascalCase for public methods, properties, and classes
- Use camelCase for private fields and local variables
- Use meaningful names that express intent
- Follow Microsoft's C# coding conventions

### Testing with XUnit and NSubstitute
```csharp
[Fact]
public async Task GetUserById_WhenUserExists_ReturnsUser()
{
    // Arrange
    var userId = 1;
    var expectedUser = new User { Id = userId, Name = "John Doe" };
    _mockRepository.GetByIdAsync(userId).Returns(expectedUser);

    // Act
    var result = await _userService.GetUserByIdAsync(userId);

    // Assert
    result.Should().BeEquivalentTo(expectedUser);
}
```
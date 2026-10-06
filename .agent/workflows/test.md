---
description: Run tests and add new test files
---

## Run Tests

// turbo
1. Run all tests once:
```bash
npm run test:run
```

// turbo
2. Run tests in watch mode:
```bash
npm test
```

// turbo
3. Run tests with coverage:
```bash
npm run test:coverage
```

// turbo
4. Run a specific test file:
```bash
npx vitest run src/client/__tests__/components/Header.test.jsx
```

## Add a New Component Test

5. Create test file at `src/client/__tests__/components/<Component>.test.jsx`
6. Use this pattern:
```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import MyComponent from "../../components/MyComponent";

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("MyComponent", () => {
  it("renders without crashing", () => {
    renderWithRouter(<MyComponent />);
    expect(screen.getByRole("...")).toBeInTheDocument();
  });
});
```

## Add a New Hook Test

7. Create test file at `src/client/__tests__/hooks/use<Hook>.test.js`
8. Mock services with `vi.mock("../../services", ...)`
9. Use `renderHook` and `waitFor` from `@testing-library/react`

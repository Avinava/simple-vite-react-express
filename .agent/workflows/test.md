---
description: Run tests and add new test files
---

## Run Tests

// turbo
1. All tests once:
```bash
npm run test:run
```

// turbo
2. Watch mode:
```bash
npm test
```

// turbo
3. Coverage:
```bash
npm run test:coverage
```

// turbo
4. One file:
```bash
npx vitest run src/client/__tests__/components/Header.test.jsx
```

## Add a Component Test

5. Create `src/client/__tests__/components/<Component>.test.jsx`
6. Wrap with the providers the component needs (router for links, `AppProvider` for theme mode):
```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AppProvider } from '../../context/AppContext';
import MyComponent from '../../components/MyComponent';

const renderWithProviders = (ui) =>
  render(
    <AppProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AppProvider>
  );

describe('MyComponent', () => {
  it('renders', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });
});
```

`localStorage` and `matchMedia` are mocked in `src/client/__tests__/setup.js`: assert on the mock calls.

## Add a Hook Test

7. Create `src/client/__tests__/hooks/use<Hook>.test.js`
8. `vi.mock('../../services', ...)` and `vi.mock('react-toastify', ...)`; copy `useTasks.test.js`
9. Use `renderHook`, `waitFor` and `act` from `@testing-library/react`

## Add a Server Test

10. Create `src/server/__tests__/<name>.test.js` (runs under jsdom config, so avoid browser globals). Test middleware and pure logic with mock `req`/`res`; see `error.test.js`. No database is needed.

/**
 * Example Component Test
 * ========================
 *
 * This file demonstrates how to write tests using:
 * - Vitest as the test runner
 * - React Testing Library for component testing
 *
 * Test patterns shown:
 * - Rendering components
 * - Querying elements
 * - Simulating user interactions
 * - Testing async behavior
 *
 * Run this test:
 *   npm test -- Header.test.jsx
 */

import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from '../../components/Header';
import { AppProvider } from '../../context/AppContext';

/**
 * Helper function to render components with required providers
 * Wraps component in the router (for links) and AppProvider (for theme mode)
 */
const renderWithRouter = (component) => {
  return render(
    <AppProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </AppProvider>
  );
};

describe('Header Component', () => {
  /**
   * Basic render test
   * Verifies the component renders without crashing
   */
  it('renders without crashing', () => {
    renderWithRouter(<Header />);
    // Header should be in the document
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  /**
   * Navigation links test
   * Verifies all navigation links are present
   */
  it('renders navigation links', () => {
    renderWithRouter(<Header />);

    // Check for main navigation links
    const nav = screen.getByRole('navigation', { name: /main/i });
    expect(nav).toHaveTextContent('Contacts');
    expect(nav).toHaveTextContent('Tasks');
    expect(nav).toHaveTextContent('Projects');
  });

  /**
   * Interaction test
   * Clicking the toggle flips the label and persists the choice
   */
  it('toggles dark mode and remembers the choice', () => {
    renderWithRouter(<Header />);

    fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));

    expect(screen.getByRole('button', { name: /switch to light mode/i })).toBeInTheDocument();
    // localStorage is mocked in __tests__/setup.js
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  /**
   * App title test
   * Verifies the app title/logo link is present
   */
  it('displays the app title', () => {
    renderWithRouter(<Header />);

    // Header uses a link for the logo/title
    const titleElement = screen.getByRole('link', { name: /simple-vite-react-express/i });
    expect(titleElement).toBeInTheDocument();
  });
});

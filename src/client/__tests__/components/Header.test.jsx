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
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Header from '../../components/Header';

/**
 * Helper function to render components with required providers
 * Wraps component in BrowserRouter for Link components to work
 */
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
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
    expect(screen.getByText(/Contacts/i)).toBeInTheDocument();
    expect(screen.getByText(/Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
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

/**
 * Additional test patterns (add more tests as needed):
 *
 * // Testing user interactions
 * it('opens menu on click', async () => {
 *   renderWithRouter(<Header />);
 *   const menuButton = screen.getByRole('button', { name: /menu/i });
 *   await userEvent.click(menuButton);
 *   expect(screen.getByRole('menu')).toBeVisible();
 * });
 *
 * // Testing with mocked data
 * it('displays user name when logged in', () => {
 *   const mockUser = { name: 'John Doe' };
 *   renderWithRouter(<Header user={mockUser} />);
 *   expect(screen.getByText('John Doe')).toBeInTheDocument();
 * });
 */

/**
 * Test Setup File
 * =================
 *
 * This file runs before each test file.
 * Use it to set up global test utilities and mocks.
 *
 * Current setup:
 * - React Testing Library cleanup between tests
 * - DOM matchers (toBeInTheDocument, etc.)
 * - Fetch mock for API calls
 */

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/**
 * Cleanup after each test
 * Unmounts React components and clears the DOM
 */
afterEach(() => {
  cleanup();
});

/**
 * Mock window.matchMedia
 * Required for components that use media queries
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

/**
 * Mock localStorage
 * Provides a simple in-memory storage for tests
 */
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

/**
 * Suppress console errors during tests
 * Uncomment if you want cleaner test output
 */
// vi.spyOn(console, 'error').mockImplementation(() => {});

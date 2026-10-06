/**
 * App Context
 * =============
 *
 * Global application context for shared state across components.
 * Currently handles:
 * - Theme mode (light/dark) - prepared for future dark mode support
 * - App-wide configuration
 *
 * This context is designed to be extended as the app grows.
 * Add new global state here instead of prop drilling through components.
 *
 * Usage:
 *   // In a component
 *   import { useAppContext } from '@/client/context';
 *   const { isDarkMode, toggleTheme } = useAppContext();
 *
 *   // Wrap app with provider (already done in index.jsx)
 *   <AppProvider>
 *     <App />
 *   </AppProvider>
 */

import { createContext, useContext, useState, useMemo, useCallback } from 'react';

/**
 * Default context values
 * @type {Object}
 */
const defaultContextValue = {
  // Theme
  isDarkMode: false,
  toggleTheme: () => {},

  // App config
  appName: 'Simple Vite React Express',
  version: '2.1.0',
};

/**
 * Create the context with default values
 */
const AppContext = createContext(defaultContextValue);

/**
 * Custom hook to use the app context
 * Throws an error if used outside of AppProvider
 * @returns {Object} App context value
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

/**
 * App Provider Component
 * Wraps the application and provides global state
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.ReactElement}
 */
export function AppProvider({ children }) {
  // Theme state - can be extended to persist in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved preference in localStorage
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Check system preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  });

  /**
   * Toggle between light and dark theme
   * Persists preference to localStorage
   */
  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem('theme', newValue ? 'dark' : 'light');
      return newValue;
    });
  }, []);

  /**
   * Set a specific theme mode
   * @param {boolean} dark - Whether to enable dark mode
   */
  const setTheme = useCallback((dark) => {
    setIsDarkMode(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // Theme
      isDarkMode,
      toggleTheme,
      setTheme,

      // App config
      appName: 'Simple Vite React Express',
      version: '2.1.0',
    }),
    [isDarkMode, toggleTheme, setTheme]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}

export default AppContext;

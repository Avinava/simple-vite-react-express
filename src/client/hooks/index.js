/**
 * Hooks Barrel Export
 * =====================
 *
 * Central export point for all custom hooks.
 * Import hooks from here for cleaner imports throughout the app.
 *
 * Usage:
 *   // Import individual hooks
 *   import { useContacts, useTasks } from '@/client/hooks';
 *
 *   // Or import specific hook
 *   import { useContacts } from '@/client/hooks/useContacts';
 */

// Data hooks
export { useContacts } from './useContacts';
export { useTasks } from './useTasks';
export { useProjects } from './useProjects';

// Utility hooks
export { useHealthCheck, ConnectionStatus } from './useHealthCheck';

/**
 * Services Barrel Export
 * =======================
 *
 * Central export point for all API services.
 * Import services from here for cleaner imports throughout the app.
 *
 * Usage:
 *   // Import individual services
 *   import { contactsService, tasksService } from '@/client/services';
 *
 *   // Or import everything
 *   import * as services from '@/client/services';
 */

// API instance (for direct API calls if needed)
export { default as api } from './api';

// Domain services
export { contactsService } from './contacts';
export { tasksService, TaskStatus, Priority } from './tasks';
export { projectsService } from './projects';
export { healthService } from './health';

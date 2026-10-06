/**
 * Tasks Service
 * ==============
 *
 * API methods for task management.
 * Handles all task-related API operations with consistent error handling.
 *
 * Usage:
 *   import { tasksService } from '@/client/services';
 *
 *   // Get all tasks
 *   const tasks = await tasksService.getAll();
 *
 *   // Update task status
 *   await tasksService.update(taskId, { status: 'IN_PROGRESS' });
 */

import api from './api';

/**
 * Task status enum values
 * @readonly
 * @enum {string}
 */
export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE',
};

/**
 * Task priority enum values
 * @readonly
 * @enum {string}
 */
export const Priority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
};

/**
 * Task data shape (for reference):
 * @typedef {Object} Task
 * @property {number} id - Unique identifier
 * @property {string} title - Task title
 * @property {string} [description] - Task description
 * @property {TaskStatus} status - Current status
 * @property {Priority} priority - Priority level
 * @property {string} [dueDate] - ISO date string
 * @property {number} [assigneeId] - Assigned contact ID
 * @property {number} [projectId] - Associated project ID
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

export const tasksService = {
  /**
   * Fetch all tasks
   * @returns {Promise<{success: boolean, data: Task[]}>}
   */
  getAll: () => api.get('/task/list'),

  /**
   * Fetch a single task by ID
   * @param {number|string} id - Task ID
   * @returns {Promise<{success: boolean, data: Task}>}
   */
  getById: (id) => api.get(`/task/${id}`),

  /**
   * Create a new task
   * @param {Object} data - Task data
   * @param {string} data.title - Task title (required)
   * @param {string} [data.description] - Task description
   * @param {TaskStatus} [data.status] - Initial status (default: TODO)
   * @param {Priority} [data.priority] - Priority level (default: MEDIUM)
   * @param {string} [data.dueDate] - Due date ISO string
   * @param {number} [data.assigneeId] - Contact ID to assign
   * @param {number} [data.projectId] - Project ID to associate
   * @returns {Promise<{success: boolean, data: Task}>}
   */
  create: (data) => api.post('/task/create', data),

  /**
   * Update an existing task
   * @param {number|string} id - Task ID
   * @param {Object} data - Fields to update
   * @returns {Promise<{success: boolean, data: Task}>}
   */
  update: (id, data) => api.put(`/task/${id}`, data),

  /**
   * Delete a task
   * @param {number|string} id - Task ID
   * @returns {Promise<{success: boolean, data: Task}>}
   */
  delete: (id) => api.delete(`/task/${id}`),

  /**
   * Change only the status of a task
   * @param {number|string} id - Task ID
   * @param {string} status - One of TaskStatus
   */
  updateStatus: (id, status) => api.patch(`/task/${id}/status`, { status }),
};

export default tasksService;

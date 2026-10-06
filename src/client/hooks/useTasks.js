/**
 * useTasks Hook
 * ==============
 *
 * Custom hook for managing tasks data and operations.
 * Supports filtering by project and status.
 *
 * Features:
 * - Automatic data fetching on mount
 * - Filter by project or status
 * - Status workflow updates
 * - Loading and error states
 *
 * Usage:
 *   // Get all tasks
 *   const { tasks, isLoading } = useTasks();
 *
 *   // Get tasks for a specific project
 *   const { tasks } = useTasks({ projectId: 1 });
 *
 *   // Update task status
 *   await updateTaskStatus(taskId, 'IN_PROGRESS');
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { tasksService, TaskStatus } from '../services';

/**
 * Hook for managing tasks state and operations
 * @param {Object} options - Configuration options
 * @param {boolean} [options.autoFetch=true] - Whether to fetch on mount
 * @param {number} [options.projectId] - Filter tasks by project ID
 * @param {string} [options.status] - Filter tasks by status
 * @param {string} [options.priority] - Filter tasks by priority
 * @returns {Object} Tasks state and operations
 */
export function useTasks(options = {}) {
  const { autoFetch = true, projectId, status, priority } = options;

  // State management
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all tasks from the API
   */
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await tasksService.getAll();
      setTasks(response.data || []);
    } catch (err) {
      setError(err);
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Filtered tasks based on options
   * Uses useMemo to prevent unnecessary recalculations
   */
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Filter by project if specified
    if (projectId !== undefined) {
      result = result.filter((task) => task.projectId === Number(projectId));
    }

    // Filter by status if specified
    if (status) {
      result = result.filter((task) => task.status === status);
    }

    // Filter by priority if specified
    if (priority) {
      result = result.filter((task) => task.priority === priority);
    }

    return result;
  }, [tasks, projectId, status, priority]);

  /**
   * Create a new task
   * @param {Object} data - Task data
   * @returns {Promise<Object>} Created task
   */
  const createTask = async (data) => {
    const response = await tasksService.create(data);
    await fetchTasks();
    toast.success('Task created successfully');
    return response.data;
  };

  /**
   * Update an existing task
   * @param {number|string} id - Task ID
   * @param {Object} data - Fields to update
   * @returns {Promise<Object>} Updated task
   */
  const updateTask = async (id, data) => {
    try {
      const response = await tasksService.update(id, data);
      // Optimistic update
      setTasks((prev) =>
        prev.map((task) => (task.id === Number(id) ? { ...task, ...data } : task))
      );
      toast.success('Task updated successfully');
      return response.data;
    } catch (err) {
      await fetchTasks();
      throw err;
    }
  };

  /**
   * Quick method to update just the task status
   * @param {number|string} id - Task ID
   * @param {TaskStatus} newStatus - New status value
   * @returns {Promise<Object>} Updated task
   */
  const updateTaskStatus = async (id, newStatus) => {
    try {
      const response = await tasksService.updateStatus(id, newStatus);
      setTasks((prev) =>
        prev.map((task) => (task.id === Number(id) ? { ...task, status: newStatus } : task))
      );
      toast.success('Task status updated');
      return response.data;
    } catch (err) {
      await fetchTasks();
      throw err;
    }
  };

  /**
   * Delete a task
   * @param {number|string} id - Task ID to delete
   * @returns {Promise<void>}
   */
  const deleteTask = async (id) => {
    try {
      await tasksService.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== Number(id)));
      toast.success('Task deleted successfully');
    } catch (err) {
      await fetchTasks();
      throw err;
    }
  };

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchTasks();
    }
  }, [autoFetch, fetchTasks]);

  return {
    // State (use filtered tasks if filters applied, otherwise all)
    tasks: filteredTasks,
    allTasks: tasks, // Access all tasks even when filtering
    isLoading,
    error,

    // Operations
    refresh: fetchTasks,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,

    // Utilities
    TaskStatus, // Re-export for convenience
  };
}

export default useTasks;

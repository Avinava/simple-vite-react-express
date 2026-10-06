/**
 * useProjects Hook
 * ==================
 *
 * Custom hook for managing projects data and operations.
 * Includes member management functionality.
 *
 * Features:
 * - Automatic data fetching on mount
 * - Project CRUD operations
 * - Member add/remove operations
 * - Loading and error states
 *
 * Usage:
 *   const {
 *     projects,
 *     isLoading,
 *     createProject,
 *     addMember,
 *     removeMember,
 *   } = useProjects();
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { projectsService } from '../services';

/**
 * Hook for managing projects state and operations
 * @param {Object} options - Configuration options
 * @param {boolean} [options.autoFetch=true] - Whether to fetch on mount
 * @returns {Object} Projects state and operations
 */
export function useProjects(options = {}) {
  const { autoFetch = true } = options;

  // State management
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all projects from the API
   */
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await projectsService.getAll();
      setProjects(response.data || []);
    } catch (err) {
      setError(err);
      console.error('Error fetching projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch a single project by ID with full details
   * @param {number|string} id - Project ID
   * @returns {Promise<Object>} Project with members and tasks
   */
  const getProject = async (id) => {
    try {
      const response = await projectsService.getById(id);
      return response.data;
    } catch (err) {
      console.error('Error fetching project:', err);
      throw err;
    }
  };

  /**
   * Create a new project
   * @param {Object} data - Project data
   * @returns {Promise<Object>} Created project
   */
  const createProject = async (data) => {
    const response = await projectsService.create(data);
    await fetchProjects();
    toast.success('Project created successfully');
    return response.data;
  };

  /**
   * Update an existing project
   * @param {number|string} id - Project ID
   * @param {Object} data - Fields to update
   * @returns {Promise<Object>} Updated project
   */
  const updateProject = async (id, data) => {
    try {
      const response = await projectsService.update(id, data);
      setProjects((prev) =>
        prev.map((project) => (project.id === Number(id) ? { ...project, ...data } : project))
      );
      toast.success('Project updated successfully');
      return response.data;
    } catch (err) {
      await fetchProjects();
      throw err;
    }
  };

  /**
   * Delete a project
   * @param {number|string} id - Project ID to delete
   * @returns {Promise<void>}
   */
  const deleteProject = async (id) => {
    try {
      await projectsService.delete(id);
      setProjects((prev) => prev.filter((project) => project.id !== Number(id)));
      toast.success('Project deleted successfully');
    } catch (err) {
      await fetchProjects();
      throw err;
    }
  };

  /**
   * Add a member to a project
   * @param {number|string} projectId - Project ID
   * @param {number|string} contactId - Contact ID to add
   * @param {string} [role='member'] - Member's role
   * @returns {Promise<Object>} Created membership
   */
  const addMember = async (projectId, contactId, role = 'member') => {
    const response = await projectsService.addMember(projectId, contactId, role);
    toast.success('Member added successfully');
    // Refresh to get updated member list
    await fetchProjects();
    return response.data;
  };

  /**
   * Remove a member from a project
   * @param {number|string} projectId - Project ID
   * @param {number|string} contactId - Contact ID to remove
   * @returns {Promise<void>}
   */
  const removeMember = async (projectId, contactId) => {
    await projectsService.removeMember(projectId, contactId);
    toast.success('Member removed successfully');
    await fetchProjects();
  };

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchProjects();
    }
  }, [autoFetch, fetchProjects]);

  return {
    // State
    projects,
    isLoading,
    error,

    // Operations
    refresh: fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,

    // Member management
    addMember,
    removeMember,
  };
}

export default useProjects;

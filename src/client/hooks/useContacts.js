/**
 * useContacts Hook
 * =================
 *
 * Custom hook for managing contacts data and operations.
 * Provides a clean interface for components to interact with contacts.
 *
 * Features:
 * - Automatic data fetching on mount
 * - Loading and error states
 * - CRUD operations with automatic refresh
 * - Optimistic updates for better UX
 *
 * Usage:
 *   const {
 *     contacts,      // Array of contacts
 *     isLoading,     // Boolean loading state
 *     error,         // Error object if any
 *     refresh,       // Function to refetch data
 *     createContact, // Function to create new contact
 *     updateContact, // Function to update contact
 *     deleteContact, // Function to delete contact
 *   } = useContacts();
 */

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { contactsService } from '../services';

/**
 * Hook for managing contacts state and operations
 * @param {Object} options - Configuration options
 * @param {boolean} [options.autoFetch=true] - Whether to fetch on mount
 * @returns {Object} Contacts state and operations
 */
export function useContacts(options = {}) {
  const { autoFetch = true } = options;

  // State management
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetch all contacts from the API
   * Wrapped in useCallback to prevent unnecessary re-renders
   */
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await contactsService.getAll();
      setContacts(response.data || []);
    } catch (err) {
      setError(err);
      console.error('Error fetching contacts:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new contact
   * @param {Object} data - Contact data (firstName, lastName, email, etc.)
   * @returns {Promise<Object>} Created contact
   */
  const createContact = async (data) => {
    const response = await contactsService.create(data);
    // Refresh the list to include the new contact
    await fetchContacts();
    toast.success('Contact created successfully');
    return response.data;
  };

  /**
   * Update an existing contact
   * @param {number|string} id - Contact ID
   * @param {Object} data - Fields to update
   * @returns {Promise<Object>} Updated contact
   */
  const updateContact = async (id, data) => {
    try {
      const response = await contactsService.update(id, data);
      // Optimistic update - update local state immediately
      setContacts((prev) =>
        prev.map((contact) => (contact.id === Number(id) ? { ...contact, ...data } : contact))
      );
      toast.success('Contact updated successfully');
      return response.data;
    } catch (err) {
      // Revert optimistic update on error
      await fetchContacts();
      throw err;
    }
  };

  /**
   * Delete a contact
   * @param {number|string} id - Contact ID to delete
   * @returns {Promise<void>}
   */
  const deleteContact = async (id) => {
    try {
      await contactsService.delete(id);
      // Optimistic update - remove from local state
      setContacts((prev) => prev.filter((contact) => contact.id !== Number(id)));
      toast.success('Contact deleted successfully');
    } catch (err) {
      // Revert optimistic update on error
      await fetchContacts();
      throw err;
    }
  };

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchContacts();
    }
  }, [autoFetch, fetchContacts]);

  return {
    // State
    contacts,
    isLoading,
    error,

    // Operations
    refresh: fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}

export default useContacts;

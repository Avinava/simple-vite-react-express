/**
 * Contacts Service
 * =================
 *
 * API methods for contact management.
 * Provides a clean interface for all contact-related API operations.
 *
 * Usage:
 *   import { contactsService } from '@/client/services';
 *
 *   // Get all contacts
 *   const contacts = await contactsService.getAll();
 *
 *   // Create new contact
 *   const newContact = await contactsService.create({
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     email: 'john@example.com'
 *   });
 */

import api from './api';

/**
 * Contact data shape (for reference):
 * @typedef {Object} Contact
 * @property {number} id - Unique identifier
 * @property {string} firstName - Contact's first name
 * @property {string} lastName - Contact's last name
 * @property {string} email - Contact's email (unique)
 * @property {string} [phone] - Optional phone number
 * @property {string} [company] - Optional company name
 * @property {string} [notes] - Optional notes
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

export const contactsService = {
  /**
   * Fetch all contacts
   * @returns {Promise<{success: boolean, data: Contact[]}>}
   */
  getAll: () => api.get('/contact/list'),

  /**
   * Fetch a single contact by ID
   * @param {number|string} id - Contact ID
   * @returns {Promise<{success: boolean, data: Contact}>}
   */
  getById: (id) => api.get(`/contact/${id}`),

  /**
   * Create a new contact
   * @param {Object} data - Contact data
   * @param {string} data.firstName - First name (required)
   * @param {string} data.lastName - Last name (required)
   * @param {string} data.email - Email address (required, unique)
   * @param {string} [data.phone] - Phone number
   * @param {string} [data.company] - Company name
   * @param {string} [data.notes] - Notes
   * @returns {Promise<{success: boolean, data: Contact}>}
   */
  create: (data) => api.post('/contact', data),

  /**
   * Update an existing contact
   * @param {number|string} id - Contact ID
   * @param {Object} data - Fields to update
   * @returns {Promise<{success: boolean, data: Contact}>}
   */
  update: (id, data) => api.put(`/contact/${id}`, data),

  /**
   * Delete a contact
   * @param {number|string} id - Contact ID
   * @returns {Promise<{success: boolean, data: Contact}>}
   */
  delete: (id) => api.delete(`/contact/${id}`),
};

export default contactsService;

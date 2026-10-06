/**
 * useContact Hook
 * =================
 *
 * Fetches a single contact by ID (used by the contact detail page).
 *
 * Usage:
 *   const { contact, isLoading, error } = useContact(id);
 */

import { useState, useEffect } from 'react';
import { contactsService } from '../services';

/**
 * @param {number|string} id - Contact ID
 * @returns {{contact: Object|null, isLoading: boolean, error: Error|null}}
 */
export function useContact(id) {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    contactsService
      .getById(id)
      .then((response) => {
        if (!cancelled) setContact(response.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    // Ignore late responses if the id changes or the page unmounts
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { contact, isLoading, error };
}

export default useContact;

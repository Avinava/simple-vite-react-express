/**
 * API Service - Centralized Axios Instance
 * =========================================
 *
 * This module creates a pre-configured Axios instance for all API calls.
 * Benefits:
 * - Centralized base URL configuration
 * - Automatic error handling with toast notifications
 * - Request/response interceptors for auth, logging, etc.
 * - Consistent timeout settings
 *
 * Usage:
 *   import api from '@/client/services/api';
 *   const data = await api.get('/contact/list');
 */

import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Create axios instance with default configuration
 * All API calls will use this instance for consistency
 */
const api = axios.create({
  baseURL: '/api/v1',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * - Add authentication tokens here when implementing auth
 * - Log outgoing requests in development
 */
api.interceptors.request.use(
  (config) => {
    // Example: Add auth token if available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Development logging
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * - Automatically extract data from successful responses
 * - Handle errors with user-friendly toast notifications
 * - Log errors in development
 */
api.interceptors.response.use(
  // Success handler - extract the data payload
  (response) => {
    return response.data;
  },

  // Error handler - show toast and log
  (error) => {
    // Extract error message from response or use default
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';

    // Show error toast to user
    toast.error(message);

    // Development logging
    if (import.meta.env.DEV) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message,
      });
    }

    return Promise.reject(error);
  }
);

export default api;

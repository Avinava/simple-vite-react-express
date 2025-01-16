/**
 * Creates a standardized API response object
 * @param {boolean} success - Indicates if the operation was successful
 * @param {*} data - The data payload to be returned
 * @param {string} message - A message describing the response
 * @returns {Object} Standardized response object
 */
export const createResponse = (success, data = null, message = "") => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

/**
 * Creates a success response
 * @param {*} data - The data to be returned
 * @param {string} message - Optional success message
 * @returns {Object} Success response object
 */
export const successResponse = (data, message = "Success") => createResponse(true, data, message);

/**
 * Creates an error response
 * @param {string} message - Error message
 * @param {*} data - Optional error details
 * @returns {Object} Error response object
 */
export const errorResponse = (message = "Error", data = null) => createResponse(false, data, message);

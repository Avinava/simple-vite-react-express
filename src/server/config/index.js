/**
 * Server Configuration
 * =====================
 *
 * Centralized configuration management for the server.
 * All environment variables and app settings are validated and exported from here.
 *
 * Benefits:
 * - Single source of truth for configuration
 * - Environment variable validation
 * - Default values with clear documentation
 * - Type-safe access to config values
 *
 * Usage:
 *   import config from './config/index.js';
 *   console.log(config.port); // 8080
 */

import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Validate required environment variables
 * Throws an error if a required variable is missing
 * @param {string} name - Environment variable name
 * @returns {string} The value of the environment variable
 */
const _requireEnv = (name) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

/**
 * Get optional environment variable with default
 * @param {string} name - Environment variable name
 * @param {string} defaultValue - Default value if not set
 * @returns {string} The value or default
 */
const getEnv = (name, defaultValue = '') => {
  return process.env[name] || defaultValue;
};

/**
 * Application configuration object
 * All configuration values are validated and typed
 */
const config = {
  /**
   * Server port
   * Default: 8080
   */
  port: parseInt(getEnv('PORT', '8080'), 10),

  /**
   * Node environment
   * Values: 'development', 'production', 'test'
   */
  nodeEnv: getEnv('NODE_ENV', 'development'),

  /**
   * Check if running in development mode
   */
  isDevelopment: getEnv('NODE_ENV', 'development') === 'development',

  /**
   * Check if running in production mode
   */
  isProduction: getEnv('NODE_ENV') === 'production',

  /**
   * Check if running in test mode
   */
  isTest: getEnv('NODE_ENV') === 'test',

  /**
   * Database configuration
   */
  database: {
    url: getEnv('DATABASE_URL'),
  },

  /**
   * Security configuration
   */
  security: {
    /**
     * Rate limiting window in minutes
     */
    rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes

    /**
     * Maximum requests per window per IP
     */
    rateLimitMax: 100,
  },

  /**
   * CORS configuration
   */
  cors: {
    origin: getEnv('CORS_ORIGIN', '*'),
  },
};

export default config;

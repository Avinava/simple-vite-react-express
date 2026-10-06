import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from '../config/index.js';
import { errorResponse } from '../utils/response.js';

/**
 * Array of security middleware functions
 * Includes helmet for HTTP headers and rate limiting
 * @constant {Array<Function>}
 */
export const securityMiddleware = [
  // Helmet middleware for securing HTTP headers
  helmet(),

  // Rate limiting to prevent abuse (limits live in config/index.js)
  rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    limit: config.security.rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    // Health checks (load balancers, uptime monitors) should never be throttled
    skip: (req) => req.originalUrl.startsWith('/api/v1/health'),
    message: errorResponse('Too many requests from this IP, please try again later'),
  }),
];

/**
 * Middleware for logging incoming requests
 * Logs timestamp, HTTP method, and URL path
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};

import config from '../config/index.js';
import { errorResponse } from '../utils/response.js';

/**
 * Prisma error codes mapped to HTTP responses.
 * https://www.prisma.io/docs/orm/reference/error-reference
 */
const PRISMA_ERRORS = {
  P2002: { status: 409, message: 'A record with these values already exists' },
  P2003: { status: 409, message: 'This record is still referenced by other records' },
  P2025: { status: 404, message: 'Record not found' },
};

/**
 * Create an error that carries an HTTP status, for services/routes to throw.
 * @param {number} status - HTTP status code
 * @param {string} message - Client-safe message
 * @returns {Error}
 */
export const httpError = (status, message) => Object.assign(new Error(message), { status });

/**
 * 404 handler for unknown /api routes (so the SPA catch-all never answers API calls).
 */
export const apiNotFound = (req, res) => {
  res.status(404).json(errorResponse(`Not found: ${req.method} ${req.originalUrl}`));
};

/**
 * Global error handler. Express 5 forwards rejected async handlers here,
 * so routes don't need their own try/catch.
 */
export const errorHandler = (err, req, res, _next) => {
  const mapped = PRISMA_ERRORS[err.code];
  const status = mapped?.status ?? err.status ?? err.statusCode ?? 500;

  if (status >= 500) {
    console.error('Unhandled error:', err);
  }

  // 4xx messages are safe to show; hide details of 5xx outside development
  const message = mapped?.message ?? (status < 500 || config.isDevelopment ? err.message : null);

  res
    .status(status)
    .json(
      errorResponse(
        message || 'An unexpected error occurred',
        config.isDevelopment && status >= 500 ? { stack: err.stack } : null
      )
    );
};

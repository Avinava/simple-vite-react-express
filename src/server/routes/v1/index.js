import { Router } from 'express';
import { errors } from 'celebrate';
import contactRoutes from './contact.route.js';
import taskRoutes from './task.route.js';
import projectRoutes from './project.route.js';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/task', taskRoutes);
router.use('/project', projectRoutes);

/**
 * GET /health
 * Health check endpoint.
 */
router.get('/health', (req, res) => {
  res.send('Ok');
});

// Handle Celebrate/Joi validation errors
router.use(errors());

// General error handling middleware
router.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

export default router;

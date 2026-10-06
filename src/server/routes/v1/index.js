import { Router } from 'express';
import { errors } from 'celebrate';
import contactRoutes from './contact.route.js';
import taskRoutes from './task.route.js';
import projectRoutes from './project.route.js';
import db from '../../services/database.js';
import { successResponse, errorResponse } from '../../utils/response.js';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/task', taskRoutes);
router.use('/project', projectRoutes);

/**
 * GET /health
 * Liveness + database check. Returns 503 when the database is unreachable.
 */
router.get('/health', async (req, res) => {
  try {
    await db.prisma.$queryRaw`SELECT 1`;
    res.json(successResponse({ status: 'ok', database: 'connected' }));
  } catch (err) {
    console.error('Health check failed:', err.message);
    res.status(503).json(errorResponse('Database unavailable', { status: 'error' }));
  }
});

// Turn Celebrate/Joi validation failures into 400 responses
router.use(errors());

export default router;

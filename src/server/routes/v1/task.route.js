import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as taskService from '../../services/task.service.js';
import { successResponse } from '../../utils/response.js';
import { httpError } from '../../middleware/error.js';

const router = Router();

// Validation schemas
const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().required().min(1).max(255),
    description: Joi.string().optional().allow('').max(1000),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE').default('TODO'),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').default('MEDIUM'),
    dueDate: Joi.date().optional(),
    assigneeId: Joi.number().integer().positive().optional(),
    projectId: Joi.number().integer().positive().optional(),
  }),
};

const updateTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().optional().min(1).max(255),
    description: Joi.string().optional().allow('').max(1000),
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE').optional(),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').optional(),
    dueDate: Joi.date().optional().allow(null),
    assigneeId: Joi.number().integer().positive().optional().allow(null),
    projectId: Joi.number().integer().positive().optional().allow(null),
  }),
};

const taskIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

const taskStatusSchema = {
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE').required(),
  }),
};

// Routes: validate, call the service, send the envelope.
// Errors (including Prisma ones) are handled by middleware/error.js.
router.get('/list', async (req, res) => {
  const { status, priority, assigneeId, projectId } = req.query;
  const filters = {};

  if (status) filters.status = status;
  if (priority) filters.priority = priority;
  if (assigneeId) filters.assigneeId = parseInt(assigneeId);
  if (projectId) filters.projectId = parseInt(projectId);

  const tasks = await taskService.findAll(filters);
  res.json(successResponse(tasks, 'Tasks retrieved successfully'));
});

router.get('/:id', celebrate(taskIdSchema), async (req, res) => {
  const task = await taskService.findById(parseInt(req.params.id));
  if (!task) throw httpError(404, 'Task not found');
  res.json(successResponse(task, 'Task retrieved successfully'));
});

router.post('/create', celebrate(createTaskSchema), async (req, res) => {
  const task = await taskService.create(req.body);
  res.status(201).json(successResponse(task, 'Task created successfully'));
});

router.put('/:id', celebrate({ ...taskIdSchema, ...updateTaskSchema }), async (req, res) => {
  const task = await taskService.update(parseInt(req.params.id), req.body);
  if (!task) throw httpError(404, 'Task not found');
  res.json(successResponse(task, 'Task updated successfully'));
});

router.delete('/:id', celebrate(taskIdSchema), async (req, res) => {
  const deleted = await taskService.remove(parseInt(req.params.id));
  if (!deleted) throw httpError(404, 'Task not found');
  res.json(successResponse(null, 'Task deleted successfully'));
});

// Update task status
router.patch(
  '/:id/status',
  celebrate({ ...taskIdSchema, ...taskStatusSchema }),
  async (req, res) => {
    const task = await taskService.updateStatus(parseInt(req.params.id), req.body.status);
    if (!task) throw httpError(404, 'Task not found');
    res.json(successResponse(task, 'Task status updated successfully'));
  }
);

export default router;

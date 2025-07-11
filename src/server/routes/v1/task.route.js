import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as taskService from '../../services/task.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

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

// Routes
router.get('/list', async (req, res) => {
  try {
    const { status, priority, assigneeId, projectId } = req.query;
    const filters = {};
    
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (assigneeId) filters.assigneeId = parseInt(assigneeId);
    if (projectId) filters.projectId = parseInt(projectId);

    const tasks = await taskService.findAll(filters);
    res.json(successResponse(tasks, 'Tasks retrieved successfully'));
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json(errorResponse('Failed to fetch tasks'));
  }
});

router.get('/:id', celebrate(taskIdSchema), async (req, res) => {
  try {
    const task = await taskService.findById(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    res.json(successResponse(task, 'Task retrieved successfully'));
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json(errorResponse('Failed to fetch task'));
  }
});

router.post('/create', celebrate(createTaskSchema), async (req, res) => {
  try {
    const task = await taskService.create(req.body);
    res.status(201).json(successResponse(task, 'Task created successfully'));
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json(errorResponse('Failed to create task'));
  }
});

router.put('/:id', celebrate({ ...taskIdSchema, ...updateTaskSchema }), async (req, res) => {
  try {
    const task = await taskService.update(parseInt(req.params.id), req.body);
    if (!task) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    res.json(successResponse(task, 'Task updated successfully'));
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json(errorResponse('Failed to update task'));
  }
});

router.delete('/:id', celebrate(taskIdSchema), async (req, res) => {
  try {
    const deleted = await taskService.remove(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    res.json(successResponse(null, 'Task deleted successfully'));
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json(errorResponse('Failed to delete task'));
  }
});

// Update task status
router.patch('/:id/status', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE').required(),
  }),
}), async (req, res) => {
  try {
    const task = await taskService.updateStatus(parseInt(req.params.id), req.body.status);
    if (!task) {
      return res.status(404).json(errorResponse('Task not found'));
    }
    res.json(successResponse(task, 'Task status updated successfully'));
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json(errorResponse('Failed to update task status'));
  }
});

export default router;
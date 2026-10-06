import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as projectService from '../../services/project.service.js';
import { successResponse } from '../../utils/response.js';
import { httpError } from '../../middleware/error.js';

const router = Router();

// Validation schemas
const createProjectSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(1).max(255),
    description: Joi.string().optional().allow('').max(1000),
    status: Joi.string().optional().default('active'),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
  }),
};

const updateProjectSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().min(1).max(255),
    description: Joi.string().optional().allow('').max(1000),
    status: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional().allow(null),
  }),
};

const projectIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

const addMemberSchema = {
  [Segments.BODY]: Joi.object({
    contactId: Joi.number().integer().positive().required(),
    role: Joi.string().optional().default('member'),
  }),
};

const memberParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
    contactId: Joi.number().integer().positive().required(),
  }),
};

// Routes: validate, call the service, send the envelope.
// Errors (including Prisma ones) are handled by middleware/error.js.
router.get('/list', async (req, res) => {
  const { status } = req.query;
  const filters = {};

  if (status) filters.status = status;

  const projects = await projectService.findAll(filters);
  res.json(successResponse(projects, 'Projects retrieved successfully'));
});

router.get('/:id', celebrate(projectIdSchema), async (req, res) => {
  const project = await projectService.findById(parseInt(req.params.id));
  if (!project) throw httpError(404, 'Project not found');
  res.json(successResponse(project, 'Project retrieved successfully'));
});

router.post('/create', celebrate(createProjectSchema), async (req, res) => {
  const project = await projectService.create(req.body);
  res.status(201).json(successResponse(project, 'Project created successfully'));
});

router.put('/:id', celebrate({ ...projectIdSchema, ...updateProjectSchema }), async (req, res) => {
  const project = await projectService.update(parseInt(req.params.id), req.body);
  if (!project) throw httpError(404, 'Project not found');
  res.json(successResponse(project, 'Project updated successfully'));
});

router.delete('/:id', celebrate(projectIdSchema), async (req, res) => {
  const deleted = await projectService.remove(parseInt(req.params.id));
  if (!deleted) throw httpError(404, 'Project not found');
  res.json(successResponse(null, 'Project deleted successfully'));
});

// Project members management
router.post(
  '/:id/members',
  celebrate({ ...projectIdSchema, ...addMemberSchema }),
  async (req, res) => {
    const member = await projectService.addMember(parseInt(req.params.id), req.body);
    res.status(201).json(successResponse(member, 'Member added to project successfully'));
  }
);

router.get('/:id/members', celebrate(projectIdSchema), async (req, res) => {
  const members = await projectService.getMembers(parseInt(req.params.id));
  res.json(successResponse(members, 'Project members retrieved successfully'));
});

router.delete('/:id/members/:contactId', celebrate(memberParamsSchema), async (req, res) => {
  const removed = await projectService.removeMember(
    parseInt(req.params.id),
    parseInt(req.params.contactId)
  );
  if (!removed) throw httpError(404, 'Member not found in project');
  res.json(successResponse(null, 'Member removed from project successfully'));
});

export default router;

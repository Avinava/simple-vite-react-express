import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import * as projectService from '../../services/project.service.js';
import { successResponse, errorResponse } from '../../utils/response.js';

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

// Routes
router.get('/list', async (req, res) => {
  try {
    const { status } = req.query;
    const filters = {};
    
    if (status) filters.status = status;

    const projects = await projectService.findAll(filters);
    res.json(successResponse(projects, 'Projects retrieved successfully'));
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json(errorResponse('Failed to fetch projects'));
  }
});

router.get('/:id', celebrate(projectIdSchema), async (req, res) => {
  try {
    const project = await projectService.findById(parseInt(req.params.id));
    if (!project) {
      return res.status(404).json(errorResponse('Project not found'));
    }
    res.json(successResponse(project, 'Project retrieved successfully'));
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json(errorResponse('Failed to fetch project'));
  }
});

router.post('/create', celebrate(createProjectSchema), async (req, res) => {
  try {
    const project = await projectService.create(req.body);
    res.status(201).json(successResponse(project, 'Project created successfully'));
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json(errorResponse('Failed to create project'));
  }
});

router.put('/:id', celebrate({ ...projectIdSchema, ...updateProjectSchema }), async (req, res) => {
  try {
    const project = await projectService.update(parseInt(req.params.id), req.body);
    if (!project) {
      return res.status(404).json(errorResponse('Project not found'));
    }
    res.json(successResponse(project, 'Project updated successfully'));
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json(errorResponse('Failed to update project'));
  }
});

router.delete('/:id', celebrate(projectIdSchema), async (req, res) => {
  try {
    const deleted = await projectService.remove(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json(errorResponse('Project not found'));
    }
    res.json(successResponse(null, 'Project deleted successfully'));
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json(errorResponse('Failed to delete project'));
  }
});

// Project members management
router.post('/:id/members', celebrate({ ...projectIdSchema, ...addMemberSchema }), async (req, res) => {
  try {
    const member = await projectService.addMember(parseInt(req.params.id), req.body);
    res.status(201).json(successResponse(member, 'Member added to project successfully'));
  } catch (error) {
    console.error('Error adding member to project:', error);
    if (error.code === 'P2002') {
      res.status(400).json(errorResponse('Contact is already a member of this project'));
    } else {
      res.status(500).json(errorResponse('Failed to add member to project'));
    }
  }
});

router.get('/:id/members', celebrate(projectIdSchema), async (req, res) => {
  try {
    const members = await projectService.getMembers(parseInt(req.params.id));
    res.json(successResponse(members, 'Project members retrieved successfully'));
  } catch (error) {
    console.error('Error fetching project members:', error);
    res.status(500).json(errorResponse('Failed to fetch project members'));
  }
});

router.delete('/:id/members/:contactId', celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
    contactId: Joi.number().integer().positive().required(),
  }),
}), async (req, res) => {
  try {
    const removed = await projectService.removeMember(
      parseInt(req.params.id),
      parseInt(req.params.contactId)
    );
    if (!removed) {
      return res.status(404).json(errorResponse('Member not found in project'));
    }
    res.json(successResponse(null, 'Member removed from project successfully'));
  } catch (error) {
    console.error('Error removing member from project:', error);
    res.status(500).json(errorResponse('Failed to remove member from project'));
  }
});

export default router;
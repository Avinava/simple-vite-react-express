import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { successResponse } from '../../utils/response.js';
import { httpError } from '../../middleware/error.js';
import contactService from '../../services/contact.service.js';

const router = Router();

// Validation schemas
const contactFields = {
  firstName: Joi.string().max(100),
  lastName: Joi.string().max(100),
  email: Joi.string().email().max(255),
  phone: Joi.string().allow('').max(50),
  company: Joi.string().allow('').max(255),
  notes: Joi.string().allow('').max(2000),
};

const createContactSchema = {
  [Segments.BODY]: Joi.object({
    ...contactFields,
    firstName: contactFields.firstName.required(),
    lastName: contactFields.lastName.required(),
    email: contactFields.email.required(),
  }),
};

const updateContactSchema = {
  [Segments.BODY]: Joi.object(contactFields),
};

const contactIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

// Routes: validate, call the service, send the envelope.
// Errors (including Prisma ones) are handled by middleware/error.js.
router.get('/list', async (req, res) => {
  res.json(successResponse(await contactService.findAll()));
});

router.get('/:id', celebrate(contactIdSchema), async (req, res) => {
  const contact = await contactService.findById(req.params.id);
  if (!contact) throw httpError(404, 'Contact not found');
  res.json(successResponse(contact));
});

router.post('/', celebrate(createContactSchema), async (req, res) => {
  const contact = await contactService.create(req.body);
  res.status(201).json(successResponse(contact));
});

router.put('/:id', celebrate({ ...contactIdSchema, ...updateContactSchema }), async (req, res) => {
  const contact = await contactService.update(req.params.id, req.body);
  res.json(successResponse(contact));
});

router.delete('/:id', celebrate(contactIdSchema), async (req, res) => {
  const contact = await contactService.delete(req.params.id);
  res.json(successResponse(contact));
});

export default router;

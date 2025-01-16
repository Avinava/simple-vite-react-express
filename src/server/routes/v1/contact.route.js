import express from "express";
import { contactValidation } from "../../middleware/validate.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import contactService from "../../services/contact.service.js";

const router = express.Router();

/**
 * GET /list
 * Retrieve a list of contacts.
 */
router.get("/list", async (req, res) => {
  try {
    const contacts = await contactService.findAll();
    res.status(200).json(successResponse(contacts));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to retrieve contacts"));
  }
});

/**
 * GET /:id
 * Retrieve a contact by ID.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await contactService.findById(id);

    if (!contact) {
      return res.status(404).json(errorResponse("Contact not found"));
    }

    res.status(200).json(successResponse(contact));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to retrieve contact"));
  }
});

/**
 * POST /create
 * Create a new contact.
 */
router.post("/", contactValidation.create, async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const contact = await contactService.create({ firstName, lastName, email });

    res.status(201).json(successResponse(contact));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to create contact"));
  }
});

/**
 * PUT /update/:id
 * Update an existing contact by ID.
 */
router.put("/:id", contactValidation.update, async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const contact = await contactService.update(Number(id), { firstName, lastName, email });

    res.status(200).json(successResponse(contact));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to update contact"));
  }
});

/**
 * DELETE /delete/:id
 * Delete a contact by ID.
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await contactService.delete(Number(id));

    res.status(200).json(successResponse(contact));
  } catch (err) {
    console.error(err);
    res.status(500).json(errorResponse("Failed to delete contact"));
  }
});

export default router;

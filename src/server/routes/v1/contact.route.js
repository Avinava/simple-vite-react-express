import express from "express";
import db from "../../services/database.js";

const router = express.Router();

/**
 * GET /list
 * Retrieve a list of contacts.
 */
router.get("/list", async (req, res) => {
  try {
    const contacts = await db.prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while getting the contacts");
  }
});

/**
 * GET /:id
 * Retrieve a contact by ID.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await db.prisma.contact.findUnique({
      where: { id: Number(id) },
    });

    if (!contact) {
      return res.status(404).send("Contact not found");
    }

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while getting the contact");
  }
});

/**
 * POST /create
 * Create a new contact.
 */
router.post("/create", async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const contact = await db.prisma.contact.create({
      data: { firstName, lastName, email },
    });

    res.status(201).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while creating the contact");
  }
});

/**
 * PUT /update/:id
 * Update an existing contact by ID.
 */
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  try {
    const contact = await db.prisma.contact.update({
      where: { id: Number(id) },
      data: { firstName, lastName, email },
    });

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while updating the contact");
  }
});

/**
 * DELETE /delete/:id
 * Delete a contact by ID.
 */
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await db.prisma.contact.delete({
      where: { id: Number(id) },
    });

    res.status(200).json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the contact");
  }
});

export default router;

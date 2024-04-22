import express from "express";
import db from "../../services/database.js";

const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const contacts = await db.prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while getting the contacts");
  }
});

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
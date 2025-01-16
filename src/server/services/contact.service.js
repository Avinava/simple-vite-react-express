import db from "./database.js";

/**
 * Service class for handling contact-related business logic
 * Provides an abstraction layer between the database and route handlers
 */
class ContactService {
  /**
   * Retrieves all contacts from the database
   * @returns {Promise<Array>} List of contacts
   */
  async findAll() {
    return db.prisma.contact.findMany();
  }

  /**
   * Finds a contact by their ID
   * @param {number|string} id - The contact's ID
   * @returns {Promise<Object|null>} Contact object or null if not found
   */
  async findById(id) {
    return db.prisma.contact.findUnique({
      where: { id: Number(id) },
    });
  }

  /**
   * Creates a new contact
   * @param {Object} data - Contact data
   * @param {string} data.firstName - First name
   * @param {string} data.lastName - Last name
   * @param {string} data.email - Email address
   * @returns {Promise<Object>} Created contact
   */
  async create(data) {
    return db.prisma.contact.create({
      data,
    });
  }

  /**
   * Updates an existing contact
   * @param {number|string} id - Contact ID to update
   * @param {Object} data - Updated contact data
   * @returns {Promise<Object>} Updated contact
   */
  async update(id, data) {
    return db.prisma.contact.update({
      where: { id: Number(id) },
      data,
    });
  }

  /**
   * Deletes a contact
   * @param {number|string} id - Contact ID to delete
   * @returns {Promise<Object>} Deleted contact
   */
  async delete(id) {
    return db.prisma.contact.delete({
      where: { id: Number(id) },
    });
  }
}

export default new ContactService();

import { PrismaClient } from "@prisma/client";

/**
 * Database class to handle Prisma client instance.
 */
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    /**
     * @type {PrismaClient}
     */
    this.prisma = new PrismaClient({
      errorFormat: "minimal",
    });
    Database.instance = this;
  }
}

export default new Database();

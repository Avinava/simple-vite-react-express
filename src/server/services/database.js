import { PrismaClient } from "@prisma/client";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.prisma = new PrismaClient({
      errorFormat: "minimal",
    });
    Database.instance = this;
  }
}

export default new Database();

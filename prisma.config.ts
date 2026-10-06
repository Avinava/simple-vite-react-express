/**
 * Prisma Configuration (Prisma 7+)
 * ==================================
 *
 * This file configures how Prisma CLI tools connect to your database.
 * The database URL is read from environment variables.
 *
 * For migrations: Uses DATABASE_URL from .env
 * For client: Connection is configured via adapter in database.js
 */

import path from "node:path";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
    // Path to schema file
    schema: path.join(import.meta.dirname, "prisma", "schema.prisma"),

    // `prisma migrate reset` runs this automatically
    migrations: {
        seed: "node prisma/seed.js",
    },

    // Database connection for Prisma CLI (migrations, introspection)
    datasource: {
        url: process.env.DATABASE_URL!,
    },
});


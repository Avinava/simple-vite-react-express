/**
 * Database Service (Prisma 7+)
 * ==============================
 *
 * Singleton pattern for PrismaClient to ensure single database connection.
 * Prisma 7 uses the adapter pattern for direct database connections.
 */

import dotenv from 'dotenv';
dotenv.config();

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

/**
 * Database class to handle Prisma client instance.
 */
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    // Create PostgreSQL connection pool
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    // Idle clients can error (e.g. DB restart); log instead of crashing the process
    pool.on('error', (err) => console.error('Unexpected PostgreSQL pool error:', err.message));
    this.pool = pool;

    // Create Prisma adapter
    const adapter = new PrismaPg(pool);

    /**
     * Initialize PrismaClient with the PostgreSQL adapter
     */
    this.prisma = new PrismaClient({
      errorFormat: 'minimal',
      adapter,
    });
    Database.instance = this;
  }

  /**
   * Close Prisma and the pg pool. Called during graceful shutdown.
   */
  async disconnect() {
    await this.prisma.$disconnect();
    await this.pool.end().catch(() => {}); // already closed by the adapter
  }
}

export default new Database();

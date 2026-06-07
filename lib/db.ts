import { Pool } from "pg"

// Single shared pool for the lead-capture database.
let pool: Pool | undefined

export function getPool() {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL })
  }
  return pool
}

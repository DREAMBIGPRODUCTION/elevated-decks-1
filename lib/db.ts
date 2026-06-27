import { Pool } from "pg"

declare global {
  // eslint-disable-next-line no-var
  var __leadPool: Pool | undefined
}

function createPool() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Update .env.local with your production PostgreSQL connection string.",
    )
  }

  // Update DATABASE_URL in .env.local to point at your externally hosted production PostgreSQL server.
  return new Pool({
    connectionString,
  })
}

export const db = global.__leadPool ?? createPool()

if (process.env.NODE_ENV !== "production") {
  global.__leadPool = db
}

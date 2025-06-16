import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"
import * as schema from "./schema"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(process.env.DATABASE_URL)
export const db = drizzle(sql, { schema })

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    console.log("Database connected successfully:", result[0].current_time)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

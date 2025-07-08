import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// logger
// const db = drizzle(sql, { logger: true })
const db = drizzle(sql)

export { db }
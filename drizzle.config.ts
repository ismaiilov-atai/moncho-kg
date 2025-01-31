import { defineConfig, type Config } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './server/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env[process.env.NODE_ENV === 'test' ? 'TEST_DATABASE_URL' : 'DATABASE_URL']!,
  },
}) satisfies Config
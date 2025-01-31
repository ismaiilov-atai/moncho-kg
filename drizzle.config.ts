import { defineConfig, type Config } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  out: './drizzle',
  schema: './server/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  }
});
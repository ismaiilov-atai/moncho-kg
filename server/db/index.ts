import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from './schema/user.sch'
import * as slotSchema from './schema/slot.sch'
import * as daySchema from './schema/day.sch'
import * as usersToSlos from './schema/users_to_slots'
import 'dotenv/config';
// You can specify any property from the node-postgres connection options
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
  casing: 'snake_case',
  schema: { ...userSchema, ...slotSchema, ...daySchema, ...usersToSlos }
});
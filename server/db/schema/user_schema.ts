import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid('user_id').defaultRandom().notNull(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number').notNull().unique(),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  name: z.string().min(3),
  lastName: z.string().min(3),
  phoneNumber: z.string().min(13)
})

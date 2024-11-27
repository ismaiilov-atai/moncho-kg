import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  phoneNumber: integer().notNull().unique(),
});

export const insertUserSchema = createInsertSchema(usersTable, {
  id: z.number(),
  name: z.string(),
  lastName: z.string(),
  phoneNumber: z.number()
})


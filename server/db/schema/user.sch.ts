import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { usersToSlots } from './users_to_slots';
import { createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const users = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity(),
  userId: uuid('user_id').defaultRandom().primaryKey().unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number').notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToSlots: many(usersToSlots),
}));

export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(3),
  lastName: z.string().min(3),
  phoneNumber: z.string().min(13)
})

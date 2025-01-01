import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core"
import { bookingsToUsers } from './users_to_booking'
import { createInsertSchema } from 'drizzle-zod'
import { relations } from 'drizzle-orm'
import { z } from 'zod'

export const users = pgTable("users", {
  id: integer().generatedAlwaysAsIdentity(),
  userId: uuid('user_id').defaultRandom().primaryKey().unique().notNull(),
  name: varchar({ length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  phoneNumber: varchar('phone_number').notNull().unique(),
  beenTimes: integer('been_times').notNull().$default(() => 0)
})

export const usersRelations = relations(users, ({ many }) => ({
  usersToBookings: many(bookingsToUsers),
}))

export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(3),
  lastName: z.string().min(3),
  phoneNumber: z.string().min(13)
  // phoneNumber: z.string()
})

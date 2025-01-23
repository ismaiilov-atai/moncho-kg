import { integer, pgTable, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core'
import { bookingsToSlots } from './bookings_to_slots'
import { bookingsToUsers } from './users_to_booking'
import { number, string, enum as enum_ } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { relations } from 'drizzle-orm'

export const statusEnum = pgEnum('status', ['pending', 'confirmed', 'failed'])

export const bookings = pgTable('bookings', {
  id: integer().generatedAlwaysAsIdentity(),
  bookingId: uuid('booking_id').defaultRandom().primaryKey().notNull(),
  withYou: integer('with_you').$default(() => 0).notNull(),
  status: statusEnum(),
  when: timestamp({ mode: 'string' }).notNull(),
  slotBelongsTo: uuid('slot_belongs_to').notNull(),
  userBelongsTo: uuid('user_belongs_to').notNull()
})

export const bookingRelations = relations(bookings, ({ many }) => ({
  slotToBookings: many(bookingsToSlots),
  userToBookings: many(bookingsToUsers)
}))

export const insertBookingsSchema = createInsertSchema(bookings, {
  bookingId: string(),
  withYou: number(),
  status: enum_(['pending', 'confirmed', 'failed']),
  when: string()
})


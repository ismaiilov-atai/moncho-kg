import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { bookings } from './booking.sch'
import { relations } from 'drizzle-orm'
import { number, string, z } from 'zod'
import { users } from './user.sch'



export const bookingsToUsers = pgTable(
  'bookings_to_users',
  {
    userId: uuid('user_id')
      .references(() => users.userId, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull()
    ,
    bookingId: uuid('booking_id')
      .references(() => bookings.bookingId, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.bookingId] })
  })
)

export const bookingsToUsersRelations = relations(bookingsToUsers, ({ one }) => ({
  user: one(users, {
    fields: [bookingsToUsers.userId],
    references: [users.userId],
  }),
  bookings: one(bookings, {
    fields: [bookingsToUsers.bookingId],
    references: [bookings.bookingId],
  })
}))
export const createBookingSchema = z.object({
  userId: string(),
  slotId: string(),
  withYou: number()
})

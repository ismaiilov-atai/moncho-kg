import { foreignKey, pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core'
import { bookings } from './booking.sch'
import { relations } from 'drizzle-orm'
import { number, string, z } from 'zod'
import { users } from './user.sch'



export const bookingsToUsers = pgTable(
  'bookings_to_users',
  {
    userId: text('user_id').notNull(),
    bookingId: uuid('booking_id').notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.bookingId] }),

    userFk: foreignKey({
      name: "bookings_to_users_user_fk",
      columns: [t.userId],
      foreignColumns: [users.userId],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),

    bookingFk: foreignKey({
      name: "bookings_to_users_booking_fk",
      columns: [t.bookingId],
      foreignColumns: [bookings.bookingId],
    })
      .onDelete('cascade')
      .onUpdate('cascade'),
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
  }),


}))

export const createBookingSchema = z.object({
  userId: string(),
  slotId: string(),
  withYou: number()
})

import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { bookings } from './booking.sch'
import { relations } from 'drizzle-orm'
import { slots } from './slot.sch'
import { string, } from 'zod'


export const bookingsToSlots = pgTable(
  'bookins_to_slots',
  {
    bookingId: uuid('booking_id')
      .references(() => bookings.bookingId, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull(),
    slotId: uuid('slot_id')
      .references(() => slots.slotId, { onDelete: 'cascade', onUpdate: 'cascade' })
      .notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.bookingId, t.slotId] })
  })
)

export const bookingToSlotsRelations = relations(bookingsToSlots, ({ one }) => ({
  bookings: one(bookings, {
    fields: [bookingsToSlots.bookingId],
    references: [bookings.bookingId],
  }),
  user: one(slots, {
    fields: [bookingsToSlots.slotId],
    references: [slots.slotId],
  }),
}))

export const createBookingToSlotSachema = createInsertSchema(bookingsToSlots, {
  bookingId: string(),
  slotId: string(),
})

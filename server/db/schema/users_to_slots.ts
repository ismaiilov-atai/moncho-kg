import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { relations } from 'drizzle-orm'
import { users } from './user.sch'
import { slots } from './slot.sch'
import { z } from 'zod'


export const usersToSlots = pgTable(
  'users_to_slots',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.userId),
    slotId: uuid('slot_id')
      .notNull()
      .references(() => slots.slotId),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.slotId] })
  })
)


export const usersToGroupsRelations = relations(usersToSlots, ({ one }) => ({
  slot: one(slots, {
    fields: [usersToSlots.slotId],
    references: [slots.slotId],
  }),
  user: one(users, {
    fields: [usersToSlots.userId],
    references: [users.userId],
  }),
}))

export const createReservationSchema = createInsertSchema(usersToSlots, {
  slotId: z.string(),
  userId: z.string()
})
import { boolean, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersToSlots } from './users_to_slots'
import { relations } from 'drizzle-orm'
import { days } from './day.sch'

export const slots = pgTable('slots', {
  id: integer().generatedAlwaysAsIdentity(),
  slotId: uuid('slot_id').defaultRandom().primaryKey().notNull(),
  isFull: boolean('is_full'),
  spaceLeft: integer('space_left'),
  time: timestamp('time').notNull(),
  dayBelongsTo: uuid('day_belongs_to')
})

export const slotsRelations = relations(slots, ({ one, many }) => ({
  dayBelongsTo: one(days, {
    fields: [slots.dayBelongsTo],
    references: [days.dayId],
  }),
  userToSlots: many(usersToSlots)
}))
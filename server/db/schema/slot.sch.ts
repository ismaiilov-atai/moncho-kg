import { boolean, foreignKey, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { number, string, z, boolean as zBoolean } from 'zod'
import { createInsertSchema } from 'drizzle-zod'
import { usersToSlots } from './users_to_slots'
import { relations } from 'drizzle-orm'
import { days } from './day.sch'



export const slots = pgTable('slots', {
  id: integer().generatedAlwaysAsIdentity(),
  slotId: uuid('slot_id').defaultRandom().primaryKey().notNull(),
  isFull: boolean('is_full').notNull(),
  spaceLeft: integer('space_left').notNull(),
  time: timestamp('time', { mode: 'string' }).notNull(),
  dayBelongsTo: uuid('day_belongs_to').notNull()
}, (table) => ({
  fk: foreignKey({
    name: "day_fk",
    columns: [table.dayBelongsTo],
    foreignColumns: [days.dayId],
  })
    .onDelete('cascade')
    .onUpdate('cascade')
}))

export const slotsRelations = relations(slots, ({ one, many }) => ({
  dayBelongsTo: one(days, {
    fields: [slots.dayBelongsTo],
    references: [days.dayId],
  }),
  userToSlots: many(usersToSlots)
}))

export const insertSlot = createInsertSchema(slots, {
  slotId: string(),
  isFull: zBoolean(),
  spaceLeft: number(),
  time: z.string(),
})
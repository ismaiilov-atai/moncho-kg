
import { boolean, date, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { slots } from './slot.sch';

export const days = pgTable("days", {
  id: integer().generatedAlwaysAsIdentity(),
  dayId: uuid('day_id').defaultRandom().primaryKey().notNull(),
  passed: boolean(),
  day: date({ mode: 'date' })
});

export const daysRelations = relations(days, ({ many }) => ({
  slots: many(slots),
}))



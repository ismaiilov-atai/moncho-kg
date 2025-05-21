import { integer, pgTable, uuid, varchar, } from 'drizzle-orm/pg-core'
import { hourlyStats } from './hourly_stats.sch'
import { relations } from 'drizzle-orm'

export const statistics = pgTable("statistics", {
  id: integer().generatedAlwaysAsIdentity(),
  statsId: uuid('stats_id').defaultRandom().primaryKey().notNull(),
  day: varchar({ length: 255 }).notNull(),
})

export const statisticsRelations = relations(statistics, ({ many }) => ({
  hourlyStats: many(hourlyStats),
}))

import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { statistics } from './stats.sch'
import { relations } from 'drizzle-orm'

export const hourlyStats = pgTable('hourlyStats', {
  id: integer().generatedAlwaysAsIdentity(),
  hourId: uuid('stats_id').defaultRandom().primaryKey().unique().notNull(),
  dayBelongTo: uuid('day_belong_to'),
  hour: varchar('hour').notNull(),
  stats: integer('stats').notNull().$default(() => 0)
})

export const hourlyStatsRelations = relations(hourlyStats, ({ one }) => ({
  author: one(statistics, {
    fields: [hourlyStats.dayBelongTo],
    references: [statistics.statsId],
  }),
}))

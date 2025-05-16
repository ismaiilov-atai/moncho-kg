import type { hourlyStats } from '../db/schema/hourly_stats.sch'
import type { statistics } from '../db/schema/stats.sch'

export interface SlotStatsType {
  slotId: string
  spaceLeft: number
  time: string
}

type HourlyStatsType = typeof hourlyStats.$inferSelect
type Statistics = typeof statistics.$inferSelect

export interface StatisticsQueryType extends Statistics {
  hourlyStats: HourlyStatsType[]
}

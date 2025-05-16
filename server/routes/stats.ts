import type { StatisticsQueryType } from '../types/stats'
import { Hono } from 'hono'
import { db } from '../db'


const getStats = async (): Promise<StatisticsQueryType[]> => {
  const stats: StatisticsQueryType[] = await db.query.statistics.findMany({
    with: {
      hourlyStats: true
    }
  })
  return stats
}

export const stats = new Hono()
  .get('/', async (c) => {
    try {
      const stats = await getStats()
      return c.json({ success: true, stats })
    } catch (error) {
      throw error
    }
  })
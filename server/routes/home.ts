import { getDaysStartingFromTodayASC } from '../utils/day'
import { Hono } from 'hono'


export const home = new Hono()
  .get('/', async (c) => {
    try {
      const dayss = await getDaysStartingFromTodayASC()
      return c.json({ success: true, days: dayss })
    } catch (error) {
      throw error
    }
  })
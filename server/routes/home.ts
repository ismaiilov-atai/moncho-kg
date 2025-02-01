import { getDaysStartingFromTodayASC } from '../utils/day'
import { Hono } from 'hono'


export const home = new Hono()
  .get('/', async (c) => {
    try {
      const days = await getDaysStartingFromTodayASC()
      return c.json({ success: true, days })
    } catch (error) {
      throw error
    }
  })
import { days } from '../db/schema/day.sch';
import { asc } from 'drizzle-orm';
import { db } from '../db';
import { Hono } from 'hono';


export const home = new Hono()
  .get('/', async (c) => {
    try {
      const dayss = await db.query.days.findMany({
        with: {
          slots: true
        },
        orderBy: asc(days.day)
      })

      return c.json({ success: true, days: dayss })
    } catch (error) {
      throw error
    }
  })
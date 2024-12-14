import { feedSlots } from './feed-slots'
import { days } from '../db/schema/day.sch'
import { gte } from 'drizzle-orm'
import moment from 'moment'
import { db } from '../db'


export const feedDayWithSlots = async () => {
  try {
    const dayResult = await db.query.days.findMany({
      where: gte(days.day, moment().toDate()),
    })

    const diff = 7 - dayResult.length - 1;
    let lastDay = dayResult.length ? dayResult[dayResult.length - 1].day : moment().subtract(1, 'day');
    const daysCreated = [];

    for (let i = 0; i <= diff; i++) {
      const oneDayAhead = moment(lastDay).add('1', 'days');

      const newDay = await db.insert(days).values({
        passed: false,
        day: oneDayAhead.toDate()
      }).returning()

      const newDayID = newDay[0].dayId;
      if (!newDay[0].day) throw new Error('Failed to create a day!')

      await feedSlots(newDayID, newDay[0].day);
      lastDay = oneDayAhead.toDate();
      daysCreated.push(newDay);
    }
    return daysCreated;
  } catch (error) {
    throw error;
  }
}
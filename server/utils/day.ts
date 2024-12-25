import { days } from '../db/schema/day.sch'
import { asc, gte } from 'drizzle-orm'
import { feedSlotsTo } from './slot'
import moment from 'moment'
import { db } from '../db'


export const getDaysStartingFromTodayASC = async () => {
  try {
    const dayResult = await db.query.days.findMany({
      where: gte(days.day, moment().toDate()),
      columns: {
        id: false
      },
      with: {
        slots: {
          columns: {
            id: false,
            dayBelongsTo: false
          }
        }
      },
      orderBy: asc(days.day)
    })
    return dayResult
  } catch (error) {
    throw error
  }
}

export const feedDayWithSlots = async () => {
  try {
    const dayResult = await getDaysStartingFromTodayASC()

    const diff = 7 - dayResult.length
    let lastDay = dayResult.length ? dayResult[dayResult.length - 1].day : moment().subtract(1, 'day')
    const daysCreated = []

    for (let i = 1; i <= diff; i++) {
      const oneDayAhead = moment(lastDay).add('1', 'days')

      const newDay = await db.insert(days).values({
        passed: false,
        day: oneDayAhead.toDate()
      }).returning()

      const newDayID = newDay[0].dayId
      if (!newDay[0].day) throw new Error('Failed to create a day!')

      await feedSlotsTo(newDayID, newDay[0].day)
      lastDay = oneDayAhead.toDate()
      daysCreated.push(newDay)
    }
    return daysCreated
  } catch (error) {
    throw error
  }
}
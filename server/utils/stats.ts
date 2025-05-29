import { hourlyStats } from '../db/schema/hourly_stats.sch'
import { gte, lt, and, eq } from 'drizzle-orm/expressions'
import { EXEPTION_MESSAGE } from '../types/constants'
import { statistics } from '../db/schema/stats.sch'
import type { SlotStatsType } from '../types/stats'
import { days } from '../db/schema/day.sch'
import moment from 'moment'
import { db } from '../db'


export const saveDayStats = async () => {
  const prevBishkekISODate = moment.tz('Asia/Bishkek')

  const endDate = prevBishkekISODate.endOf('day').toISOString()
  const startDate = prevBishkekISODate.subtract(1, 'day').toISOString()

  const selectedDay = await db.query.days.findFirst({
    where: and(
      gte(days.day, new Date(startDate)),
      lt(days.day, new Date(endDate))
    ),
    with: {
      slots: {
        columns: {
          spaceLeft: true,
          time: true,
          slotId: true
        }
      }
    }
  })

  const formattedDay = moment(selectedDay?.day).format('dddd')
  await findDayOrInsert(formattedDay, selectedDay!.slots)
}

const findDayOrInsert = async (day: string, slots: SlotStatsType[]) => {
  try {
    const statsDay = await db.query.statistics.findFirst({
      where: eq(statistics.day, day),
      with: {
        hourlyStats: true
      }
    })
    if (!statsDay) throw Error(EXEPTION_MESSAGE)
    if (!statsDay.hourlyStats.length) feedStats(slots, statsDay)

    slots.forEach(async (slot) => {
      await db.update(hourlyStats)
        .set({
          stats: 10 - slot.spaceLeft
        })
        .where(eq(hourlyStats.hour, moment(slot.time).format('HH:mm')))
    })

  } catch (error) {
    if ((error as Error).message === EXEPTION_MESSAGE) {
      const [statsDay] = await db.insert(statistics).values({ day }).returning()
      await feedStats(slots, statsDay)
    }
    throw error
  }
}

const feedStats = async (slots: SlotStatsType[], statsDay: {
  day: string
  id: number
  statsId: string
}) => {
  slots.forEach(async (slot) => {
    await db.insert(hourlyStats).values({
      hour: moment(slot.time).format('HH:mm'),
      dayBelongTo: statsDay.statsId,
      stats: 10 - slot.spaceLeft,
    })
  })
}
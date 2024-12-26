import { slots } from '../db/schema/slot.sch'
import moment from 'moment'
import { db } from '../db'


export const feedSlotsTo = async (dayId: string, date: Date) => {
  try {
    let timeSlot = moment(date, 'YYYY-MM-DD').utcOffset(0).set({ hour: 7, minute: 0 })
    for (let i = 0; i < 11; i++) {
      await db.insert(slots).values({
        isFull: false,
        spaceLeft: 10,
        time: timeSlot.toISOString(false),
        dayBelongsTo: dayId,
      })
      timeSlot = timeSlot.add('1:30', 'hours')

    }
  } catch (error) {
    throw error
  }
}
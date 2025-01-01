import type { SlotType } from '../types/reservation'
import { slots } from '../db/schema/slot.sch'
import { eq } from 'drizzle-orm'
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

export const updateSlotsAvailability = async ({ slotId, newAvailability }: { slotId: string, newAvailability: number }) => {
  try {
    await db.update(slots).set({
      spaceLeft: newAvailability
    }).where(eq(slots.slotId, slotId))
  } catch (error) {
    throw new Error('Failed to update slots availability!')
  }
}

export const findSlotById = async (slotId: string): Promise<SlotType> => {
  const slot = await db.query.slots.findFirst({
    where: eq(slots.slotId, slotId),
  })
  if (!slot) throw new Error(`Failed to find slot: ${slotId} `)
  return slot
}
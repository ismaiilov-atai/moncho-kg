import type { SlotType, UserSlotId } from '../types/reservation'
import { usersToSlots } from '../db/schema/users_to_slots'
import { slots } from '../db/schema/slot.sch'
import { eq } from 'drizzle-orm'
import { db } from '../db'

export const insertReservation = async (reso: UserSlotId): Promise<UserSlotId> => {
  const newReservation = await db
    .insert(usersToSlots)
    .values(reso)
    .returning()
  return newReservation[0]
}

export const findReservationWithUserSlotId = async (reservedSlotId: string): Promise<SlotType> => {
  try {
    const slot = await db.query.slots.findFirst({
      where: eq(slots.slotId, reservedSlotId),
      columns: {
        id: false
      }
    })
    if (!slot) throw slot
    return slot
  } catch (error) {
    throw error
  }
}
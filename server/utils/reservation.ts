import type { BookingType, SlotType, BookingIds } from '../types/reservation'
import { bookingsToSlots } from '../db/schema/bookings_to_slots'
import { bookingsToUsers } from '../db/schema/users_to_booking'
import { bookings } from '../db/schema/booking.sch'
import { slots } from '../db/schema/slot.sch'
import { findSlotById, updateSlotsAvailability } from './slot'
import { eq } from 'drizzle-orm'
import { db } from '../db'


export const insertReservation = async (valideBody: BookingIds): Promise<BookingType> => {
  const selectedSlot = await findSlotById(valideBody.slotId)
  const newBooking: BookingType = {
    when: selectedSlot.time,
    withYou: valideBody.withYou,
    status: 'confirmed',
    slotBelongsTo: selectedSlot.slotId!,
    userBelongsTo: valideBody.userId
  }
  const newAvailability = selectedSlot.spaceLeft - (valideBody.withYou + 1)

  const insertedBooking = await insertBooking(newBooking)
  await insertBookingToSlots({ bookingId: insertedBooking.bookingId!, slotId: selectedSlot.slotId! })
  await insertUserToBooking({ userId: valideBody.userId, bookingId: insertedBooking.bookingId! })
  await updateSlotsAvailability({ slotId: selectedSlot.slotId!, newAvailability })
  return insertedBooking
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

async function insertBookingToSlots(ids: { bookingId: string, slotId: string }) {
  return await db.insert(bookingsToSlots).values(ids)
}

async function insertBooking(newBooking: BookingType): Promise<BookingType> {
  const insertedBooking = await db.insert(bookings).values(newBooking).returning()
  return insertedBooking[0]
}

async function insertUserToBooking(ids: { userId: string, bookingId: string }) {
  return await db.insert(bookingsToUsers).values(ids)
}
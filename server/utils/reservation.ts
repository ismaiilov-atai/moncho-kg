import type { BookingType, SlotType, BookingIds } from '../types/reservation'
import { bookingsToSlots } from '../db/schema/bookings_to_slots'
import { bookingsToUsers } from '../db/schema/users_to_booking'
import { findSlotById, updateSlotsAvailability } from './slot'
import { bookings } from '../db/schema/booking.sch'
import { slots } from '../db/schema/slot.sch'
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

export const findBookingById = async (bookingId: string): Promise<BookingType> => {
  try {
    const foundBooking = await db.query.bookings.findFirst({
      where: eq(bookings.bookingId, bookingId),
      columns: {
        id: false
      }
    })
    if (!foundBooking) throw foundBooking
    return foundBooking
  } catch (error) {
    throw error
  }
}

export const rescheduleBookingFromTo = async (fromId: string, toId: string): Promise<BookingType> => {
  try {
    const toReservation = await findSlotById(toId)
    const oldBooking = await findBookingById(fromId)

    const fromSlot = await db.query.slots.findFirst({
      where: eq(slots.time, oldBooking.when)
    })

    if (!fromSlot) throw Error('Not able to find old Reservation slot')

    const [updatedReso] = await db.update(bookings)
      .set({ when: toReservation.time, })
      .where(eq(bookings.bookingId, fromId))
      .returning()

    await db.update(slots)
      .set({ spaceLeft: toReservation.spaceLeft -= updatedReso.withYou ? (updatedReso.withYou + 1) : 1 })
      .where(eq(slots.slotId, toId))

    await db.update(slots)
      .set({ spaceLeft: fromSlot.spaceLeft += updatedReso.withYou ? (updatedReso.withYou + 1) : 1 })
      .where(eq(slots.slotId, fromSlot.slotId))

    return updatedReso
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
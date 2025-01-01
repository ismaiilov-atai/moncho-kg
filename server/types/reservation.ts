import type { createBookingToSlotSachema } from '../db/schema/bookings_to_slots'
import type { createBookingSchema } from '../db/schema/users_to_booking'
import type { insertBookingsSchema } from '../db/schema/booking.sch'
import type { insertSlot } from '../db/schema/slot.sch'
import type { z } from 'zod'

export type BookingIds = z.infer<typeof createBookingSchema>
export type BookingSlotId = z.infer<typeof createBookingToSlotSachema>
export type BookingType = z.infer<typeof insertBookingsSchema>
export type SlotType = z.infer<typeof insertSlot>


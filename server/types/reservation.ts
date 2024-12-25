import type { createReservationSchema } from '../db/schema/users_to_slots'
import type { insertSlot } from '../db/schema/slot.sch'
import type { z } from 'zod'

export type UserSlotId = z.infer<typeof createReservationSchema>
export type SlotType = z.infer<typeof insertSlot>


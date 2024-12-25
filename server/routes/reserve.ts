import { findReservationWithUserSlotId, insertReservation } from '../utils/reservation'
import { createReservationSchema } from '../db/schema/users_to_slots'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

export const reserve = new Hono()
  .post('/', zValidator('json', createReservationSchema), async (c) => {
    try {
      const body = c.req.valid('json')
      const validBody = createReservationSchema.parse({ ...body })
      const createdReservation = await insertReservation(validBody)
      const slot = await findReservationWithUserSlotId(createdReservation.slotId)
      return c.json({ isSuccess: true, reservedSlot: slot }, 201)
    } catch (error) {
      throw error
    }
  })
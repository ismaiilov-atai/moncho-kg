import { createBookingSchema } from '../db/schema/users_to_booking'
import { insertReservation } from '../utils/reservation'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'

export const reserve = new Hono()
  .post('/',
    zValidator('json', createBookingSchema),
    async (c) => {
      try {
        const body = c.req.valid('json')
        const validBody = createBookingSchema.parse({ ...body })
        const createdReservation = await insertReservation(validBody)
        return c.json({ isSuccess: true, reservation: createdReservation }, 201)
      } catch (error) {
        throw error
      }
    })
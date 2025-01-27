import { insertReservation, rescheduleBookingFromTo } from '../utils/reservation'
import { createBookingSchema } from '../db/schema/users_to_booking'
import { zValidator } from '@hono/zod-validator'
import { z, string } from 'zod'
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
  .put('/', zValidator('json', z.object({ from: string(), to: string() })), async (c) => {
    try {
      const body = c.req.valid('json')
      console.log(body)
      const updatedBooking = await rescheduleBookingFromTo(body.from, body.to)
      return c.json({ isSuccess: true, reservation: updatedBooking }, 202)
    } catch (e) {
      throw e
    }
  })
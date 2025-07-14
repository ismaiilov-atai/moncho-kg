import { JwtTokenInvalid } from 'hono/utils/jwt/types'
import { findUserWithId } from '../utils/user'
import type { UserType } from '../types/user'
import { decode } from 'hono/jwt'
import { Hono } from 'hono'
import moment from 'moment'

export const user = new Hono()
  .get('/', async (c) => {
    try {
      const auth = c.req.header('Authorization')
      const jwToken = auth?.replace(/^Bearer\s/, '') || ''

      const { payload } = decode(jwToken)
      const userId = payload.user_id as string

      if (!payload) return c.json({ success: false, user: {} as UserType })

      const user = await findUserWithId(userId || '')
      const flattenedBookings = user?.usersToBookings
        .map(item => item.bookings)
        .filter(booking => moment(booking.when).isAfter(moment()) && booking)
        .sort((a, b) => moment(a.when).isAfter(moment(b.when)) ? 1 : -1)

      const { usersToBookings, ...rest } = { ...user }
      const mappedUser = {
        ...rest,
        reservations: flattenedBookings
      }

      return c.json({ success: true, user: mappedUser })
    } catch (error) {
      return c.json({ success: false, user: {} as UserType })
    }
  })
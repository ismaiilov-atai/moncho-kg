import { JwtTokenInvalid } from 'hono/utils/jwt/types'
import { findUserWithId } from '../utils/user'
import type { UserType } from '../types/user'
import type { Payload } from '../types/auth'
import { Hono } from 'hono'
import moment from 'moment'


export const user = new Hono()
  .get('/', async (c) => {
    try {
      const auth = c.req.header('Authorization')
      const payload = c.get('jwtPayload') as Payload
      if (!payload) return c.json({ success: true, user: {} as UserType, token: '' })

      const user = await findUserWithId(payload.sub)
      const flattenedBookings = user?.usersToBookings
        .map(item => item.bookings)
        .filter(booking => moment(booking.when).isAfter(moment()) && booking)

      const { usersToBookings, ...rest } = { ...user }
      const mappedUser = {
        ...rest,
        reservations: flattenedBookings
      }

      return c.json({ success: true, user: mappedUser, token: auth?.replace(/^Bearer\s/, '') })
    } catch (error) {
      if (error instanceof JwtTokenInvalid) throw new JwtTokenInvalid('token is not valid')
      throw error
    }
  })
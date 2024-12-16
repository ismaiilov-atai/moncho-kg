import { JwtTokenInvalid } from 'hono/utils/jwt/types';
import type { Payload } from '../types/auth-types';
import { Hono } from 'hono';
import { db } from '../db';

export const user = new Hono()
  .get('/', async (c) => {
    try {
      const auth = c.req.header('Authorization');
      const payload = c.get('jwtPayload') as Payload
      const user = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.userId, payload.sub),
        columns: {
          id: false
        },
        with: {
          usersToSlots: {
            columns: {
              userId: false,
              slotId: false
            },
            with: {
              slot: {
                columns: {
                  id: false
                }
              }
            }
          }
        }
      })
      return c.json({ success: true, user, token: auth?.replace(/^Bearer\s/, '') })
    } catch (error) {
      if (error instanceof JwtTokenInvalid) throw new JwtTokenInvalid('token is not valid')
      throw error
    }

  })
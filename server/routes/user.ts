import type { Payload } from '../types/auth-types';
import { db } from '../db';
import { Hono } from 'hono';


export const user = new Hono()
  .get('/', async (c) => {
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
  })
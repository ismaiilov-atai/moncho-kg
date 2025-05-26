import { users } from '../db/schema/user.sch'
import { eq } from 'drizzle-orm'
import { db } from '../db'

export const findUserWithId = async (userId: string) => {
  return await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.userId, userId),
    columns: {
      id: false
    },
    with: {
      usersToBookings: {
        columns: {
          userId: false,
          bookingId: false
        },
        with: {
          bookings: {
            columns: {
              id: false
            }
          }
        }
      }
    }
  })
}


export const updateUserBeenTimes = async (userId: string, beenTimes: number) => {
  return await db.update(users)
    .set({ beenTimes: beenTimes >= 4 ? 0 : beenTimes })
    .where(eq(users.userId, userId))
}
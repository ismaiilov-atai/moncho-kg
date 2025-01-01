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
import { BookingType } from '@server/types/reservation'
import { InferResponseType } from 'hono/client'
import { $user } from '@/lib/api'

export type User = InferResponseType<typeof $user.$get>

export type UserState = {
  userId: string
  name: string
  lastName: string
  phoneNumber: string
  reservations: BookingType[]
  beenTimes: number
}

export type UserActions = {
  updateUserId: (userId: UserState['userId']) => void
  updateFirstName: (name: UserState['name']) => void
  updateLastName: (lastName: UserState['lastName']) => void
  updatePhoneNumber: (phoneNumber: UserState['phoneNumber']) => void
  updateReservations: (slot: UserState['reservations']) => void
  updateBeenTimes: (number: UserState['beenTimes']) => void
  updateRescheduledResorvation: (updatedBooking: BookingType) => void
  logoutSetDefaultUser: () => void
  signinUser: (user: UserState) => void
}
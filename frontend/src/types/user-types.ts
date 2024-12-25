import { InferResponseType } from 'hono/client'
// import { SlotsType } from './day-types'
import { $user } from '@/lib/api'
import { SlotType } from '@server/types/reservation'

export type User = InferResponseType<typeof $user.$get>

export type UserState = {
  userId: string
  name: string
  lastName: string
  phoneNumber: string
  pageCount: number
  reservations:  SlotType[]
}

export type UserActions = {
  updateUserId: (userId: UserState['userId']) => void
  updateFirstName: (name: UserState['name']) => void
  updateLastName: (lastName: UserState['lastName']) => void
  updatePhoneNumber: (phoneNumber: UserState['phoneNumber']) => void
  forwardAuthPage: (pageCount: UserState['pageCount']) => void
  backwardsAuthPage: (pageCount: UserState['pageCount']) => void
  updateReservations: (slot: UserState['reservations']) => void
}
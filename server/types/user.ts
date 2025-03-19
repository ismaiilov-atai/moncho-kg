import type { BookingType } from './reservation'

export interface UserType {
  name?: string | undefined
  userId?: string | undefined
  lastName?: string | undefined
  phoneNumber?: string | undefined
  beenTimes?: number | undefined
  reservations: BookingType[]
}
import { BookingType } from '@server/types/reservation'

export type RescheduleState = {
  isRescheduling: boolean
  bookingToReschedule: BookingType
}

export type RescheduleActions = {
  updateIsRescheduling: (isRescheduling: RescheduleState['isRescheduling']) => void
  updateBookingToReschedule: (rescheduleBooking: RescheduleState['bookingToReschedule']) => void
}
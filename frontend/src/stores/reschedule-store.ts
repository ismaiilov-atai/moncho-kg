import { RescheduleActions, RescheduleState } from '@/types/reschedule'
import { BookingType } from '@server/types/reservation'
import { create } from 'zustand/react'

export const useRescheduleStore = create<RescheduleState & RescheduleActions>((set) => ({
  isRescheduling: false,
  bookingToReschedule: {} as BookingType,
  updateIsRescheduling: (isRescheduling) => set(() => ({ isRescheduling })),
  updateBookingToReschedule: (bookingToReschedule) => set(() => ({ bookingToReschedule }))
}))
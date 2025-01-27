import { UserActions, UserState } from '@/types/user'
import { create } from 'zustand/react'

export const useUserStore = create<UserState & UserActions>((set) => ({
  userId: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  pageCount: 0,
  reservations: [],
  beenTimes: 0,
  updateUserId: (userId) => set(() => ({ userId })),
  updateFirstName: (name) => set(() => ({ name })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  forwardAuthPage: (authPage) => set(() => ({ pageCount: authPage + 1 })),
  backwardsAuthPage: (authPage) => set(() => ({ pageCount: authPage - 1 })),
  updateReservations: (reservations) => set(() => ({ reservations })),
  updateBeenTimes: (number) => set(() => ({ beenTimes: number })),
  updateRescheduledResorvation: (updatedBooking) => set((state) => ({
    reservations: state.reservations.map(reso =>
      reso.bookingId === updatedBooking.bookingId ? updatedBooking : reso
    )
  }))
}))


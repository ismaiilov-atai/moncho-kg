import { UserActions, UserState } from '@/types/user'
import { create } from 'zustand/react'

export const useUserStore = create<UserState & UserActions>((set) => ({
  userId: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  reservations: [],
  beenTimes: 0,
  updateUserId: (userId) => set(() => ({ userId })),
  updateFirstName: (name) => set(() => ({ name })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  updateReservations: (reservations) => set(() => ({ reservations })),
  updateBeenTimes: (number) => set(() => ({ beenTimes: number })),
  updateRescheduledResorvation: (updatedBooking) => set((state) => ({
    reservations: state.reservations.map(reso =>
      reso.bookingId === updatedBooking.bookingId ? updatedBooking : reso
    )
  }))
}))


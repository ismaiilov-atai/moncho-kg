import { UserActions, UserState } from '@/types/user'
import { create } from 'zustand/react'
import moment from 'moment'

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
    reservations: state.reservations?.map(reso =>
      reso.bookingId === updatedBooking.bookingId ? updatedBooking : reso
    ).sort((a, b) => moment(a.when).isAfter(moment(b.when)) ? 1 : -1)
  })),
  signinUser: (user) => set(() => ({
    userId: user.userId || '',
    name: user.name || '',
    lastName: user.lastName || '',
    phoneNumber: user.phoneNumber || '',
    beenTimes: user.beenTimes || 0,
    reservations: user.reservations || [],
  })),
  logoutSetDefaultUser: () => set(() => ({
    userId: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    beenTimes: 0,
    reservations: [],
  })),

}))


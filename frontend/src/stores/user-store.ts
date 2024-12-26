import { UserActions, UserState } from '@/types/user'
import { create } from 'zustand/react'

export const useUserStore = create<UserState & UserActions>((set) => ({
  userId: '',
  name: '',
  lastName: '',
  phoneNumber: '',
  pageCount: 0,
  reservations: [],
  updateUserId: (userId) => set(() => ({ userId })),
  updateFirstName: (name) => set(() => ({ name })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  forwardAuthPage: (authPage) => set(() => ({ pageCount: authPage + 1 })),
  backwardsAuthPage: (authPage) => set(() => ({ pageCount: authPage - 1 })),
  updateReservations: (reservations) => set(() => ({ reservations }))
}))


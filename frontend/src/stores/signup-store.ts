import { AuthPageState, AuthPageStateActions } from '@/types/auth'
import { create } from 'zustand/react'

export const useAuthStore = create<AuthPageState & AuthPageStateActions>(set => ({
  authPageCount: 0,
  isComingBack: false,
  forwardAuthPageCount: () => set((state) => ({ authPageCount: state.authPageCount + 1, isComingBack: false })),
  backwordAuthPageCount: () => set((state) => ({ authPageCount: state.authPageCount - 1, isComingBack: true }))
}))
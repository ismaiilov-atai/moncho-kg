import { AuthPageState, AuthPageStateActions } from '@/types/auth'
import { create } from 'zustand/react'

export const useAuthStore = create<AuthPageState & AuthPageStateActions>((set) => ({
  authPageCount: 0,
  isComingBack: false,
  forwardAuthPageCount: (authPage) => set(() => ({ authPageCount: authPage + 1, isComingBack: false })),
  backwordAuthPageCount: (authPage) => set(() => ({ authPageCount: authPage - 1, isComingBack: true }))
}))
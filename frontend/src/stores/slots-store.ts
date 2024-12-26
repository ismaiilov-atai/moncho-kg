import { HomeActions, HomeState } from '@/types/day'
import { create } from 'zustand/react'

export const useSlotsStore = create<HomeState & HomeActions>((set) => ({
  slots: [],
  selectedDayId: '',
  updateSlots: (slots) => set(() => ({ slots })),
  updateSelectedDayId: (selectedDayId) => set(() => ({ selectedDayId }))
}))

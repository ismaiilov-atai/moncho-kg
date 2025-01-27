import { HomeActions, HomeState, SlotsType } from '@/types/day'
import { create } from 'zustand/react'

export const useSlotsStore = create<HomeState & HomeActions>((set) => ({
  slots: [],
  selectedDayId: '',
  selectedSlot: {} as SlotsType,
  updateSlots: (slots) => set(() => ({ slots })),
  updateSelectedSlot: (selectedSlot) => set(() => ({ selectedSlot })),
  updateSelectedDayId: (selectedDayId) => set(() => ({ selectedDayId }))
}))

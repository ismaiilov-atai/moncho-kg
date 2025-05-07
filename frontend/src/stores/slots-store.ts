import { SlotsActions, SlotsState } from '@/types/slot'
import { SlotsType } from '@/types/day'
import { create } from 'zustand/react'

export const useSlotsStore = create<SlotsState & SlotsActions>((set) => ({
  slots: [],
  // selectedDayId: '',
  selectedSlot: {} as SlotsType,
  updateSlots: (slots) => set(() => ({ slots })),
  updateSelectedSlot: (selectedSlot) => set(() => ({ selectedSlot })),
  // updateSelectedDayId: (selectedDayId) => set(() => ({ selectedDayId }))
}))

import { HomeActions, HomeState } from '@/types/day-types';
import { create } from 'zustand/react';

export const useSlotsStore = create<HomeState & HomeActions>((set) => ({
  slots: [],
  selectedDayId: '',
  updateSlots: (slots) => set(() => ({ slots })),
  updateSelectedDayId: (selectedDayId) => set(() => ({ selectedDayId }))
}));

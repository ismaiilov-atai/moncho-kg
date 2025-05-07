import { DayActions, DayState, DaysType } from '@/types/day'
import { create } from 'zustand/react'

export const useDaysStore = create<DayState & DayActions>((set) => ({
  days: [],
  selectedDay: {} as DaysType,
  selectedDayId: '',
  updateDays: (days) => set(() => ({ days })),
  updateSelectedDay: (selectedDay) => set(() => ({ selectedDay })),
  updateSelectedDayId: (selectedDayId) => set(() => ({ selectedDayId }))
}))

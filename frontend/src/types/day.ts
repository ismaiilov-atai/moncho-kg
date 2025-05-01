import { InferResponseType } from 'hono/client'
import { $day } from '@/lib/api'

export type DaysResponse = InferResponseType<typeof $day.$get>
export type DaysType = DaysResponse['days'][0]
export type SlotsType = DaysType['slots'][0]

export type DayState = {
  days: DaysType[]
  selectedDay: DaysType
  selectedDayId: string
}

export type DayActions = {
  updateDays: (selectedDay: DayState['days']) => void
  updateSelectedDay: (selectedDay: DayState['selectedDay']) => void
  updateSelectedDayId: (dayId: DayState['selectedDayId']) => void
}
import { $day } from '@/lib/api'
import { InferResponseType } from 'hono/client'

export type DaysResponse = InferResponseType<typeof $day.$get>
export type DaysType = DaysResponse['days'][0]
export type SlotsType = DaysType['slots'][0]

export type HomeState = {
  slots: SlotsType[]
  selectedDayId: string
}

export type HomeActions = {
  updateSlots: (slots: HomeState['slots']) => void
  updateSelectedDayId: (dayId: HomeState['selectedDayId']) => void
}
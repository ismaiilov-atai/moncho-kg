import { InferResponseType } from 'hono/client'
import { $day } from '@/lib/api'

export type DaysResponse = InferResponseType<typeof $day.$get>
export type DaysType = DaysResponse['days'][0]
export type SlotsType = DaysType['slots'][0]

export type HomeState = {
  slots: SlotsType[]
  selectedSlot: SlotsType
  selectedDayId: string
}

export type HomeActions = {
  updateSlots: (slots: HomeState['slots']) => void
  updateSelectedSlot: (selectedSlot: HomeState['selectedSlot']) => void
  updateSelectedDayId: (dayId: HomeState['selectedDayId']) => void
}
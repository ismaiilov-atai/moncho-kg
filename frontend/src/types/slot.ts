import { InferResponseType } from 'hono/client'
import { $day } from '@/lib/api'

export type DaysResponse = InferResponseType<typeof $day.$get>
export type DaysType = DaysResponse['days'][0]
export type SlotsType = DaysType['slots'][0]

export type SlotsState = {
  slots: SlotsType[]
  selectedSlot: SlotsType
}

export type SlotsActions = {
  updateSlots: (slots: SlotsState['slots']) => void
  updateSelectedSlot: (selectedSlot: SlotsState['selectedSlot']) => void
}
import { ReactFormExtendedApi, Validator } from '@tanstack/react-form'
import { useSlotsStore } from '@/stores/slots-store'
import { QueryClient } from '@tanstack/react-query'
import { useDaysStore } from '@/stores/days-store'
import { DaysType, SlotsType } from '@/types/day'
import { clsx, type ClassValue } from "clsx"
import { ZodType, ZodTypeDef } from 'zod'
import { twMerge } from "tailwind-merge"
import { daysQueryOptions } from './api'
import moment from 'moment-timezone'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onFormSubmit = <T>(
  e: React.FormEvent<HTMLFormElement>,
  form: ReactFormExtendedApi<T, Validator<unknown, ZodType<any, ZodTypeDef, any>>>
) => {
  e.preventDefault()
  e.stopPropagation()
  form.handleSubmit()
}


export const greeting = (hour = moment().hour()) => {
  if (hour > 16) {
    return 'evening'
  } else if (hour > 11) {
    return 'afternoon'
  }
  return 'morning'
}

export const findSlotsByDayId = (dayId: string, days: DaysType[]): SlotsType[] => {
  return days.find((day) => day.dayId === dayId)?.slots || days[0].slots
}


export const fetchDaysAndSetSelectedId = async (queryClient: QueryClient): Promise<{ days: DaysType[], error: Error | null }> => {
  try {
    const days = await queryClient.fetchQuery(daysQueryOptions)
    if (!days.length) throw Error()

    const { updateSlots } = useSlotsStore.getState()
    const { updateSelectedDayId, selectedDayId, updateDays } =
      useDaysStore.getState()
    updateSelectedDayId(selectedDayId || days[0].dayId || '')
    updateSlots(findSlotsByDayId(selectedDayId, days as DaysType[]))
    updateDays(days)
    return { days, error: null }
  } catch (error) {
    return { days: [], error: new Error('days-failed') }
  }
}

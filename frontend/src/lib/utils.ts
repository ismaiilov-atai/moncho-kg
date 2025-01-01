import { ReactFormExtendedApi, Validator } from '@tanstack/react-form'
import { DaysType, SlotsType } from '@/types/day'
import { clsx, type ClassValue } from "clsx"
import { ZodType, ZodTypeDef } from 'zod'
import { twMerge } from "tailwind-merge"
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
};


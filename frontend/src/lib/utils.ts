import { ReactFormExtendedApi, Validator } from '@tanstack/react-form'
import { BeforeLoadContextType } from '@/types/miscellaneous'
import { daysQueryOptions, userQueryOptions } from './api'
import { useSlotsStore } from '@/stores/slots-store'
import { QueryClient } from '@tanstack/react-query'
import { useDaysStore } from '@/stores/days-store'
import { useUserStore } from '@/stores/user-store'
import { DaysType, SlotsType } from '@/types/day'
import { clsx, type ClassValue } from "clsx"
import { ZodType, ZodTypeDef } from 'zod'
import { twMerge } from "tailwind-merge"
import moment from 'moment-timezone'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MetaHead = (ctx: any) => {
  const { translation } = ctx.match.context
  return {
    meta: [
      { title: translation ? translation('MonchoKG') : 'MonchoKG' },
      {
        name: 'description',
        content: translation
          ? translation('board-welcome-description')
          : 'Welcome to MonchoKG',
      },
    ],
  }
}

export const BeforeLoad = async ({ context: { queryClient } }: BeforeLoadContextType) => {
  const { userId, logoutSetDefaultUser, signinUser } =
    useUserStore.getState()

  try {
    if (!userId) {
      const result = await queryClient.ensureQueryData(userQueryOptions)
      if ('err' in result || !result.success) throw result
      const { userId, phoneNumber, name, lastName, beenTimes, reservations } =
        result.user

      signinUser({
        userId: userId || '',
        phoneNumber: phoneNumber || '',
        name: name || '',
        lastName: lastName || '',
        beenTimes: beenTimes || 0,
        reservations: reservations || [],
      })
    }
  } catch (error) {
    logoutSetDefaultUser()
  }
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

import { $day } from '@/lib/api'
import { DaysType } from '@/types/day'

export const getDays = async (): Promise<DaysType[]> => {
  try {
    const response = await $day.$get()
    const result = await response.json()
    if ('err' in result || !result.success) throw result
    return result.days
  } catch (error) {
    throw error
  }
}
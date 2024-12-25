import { UserSlotId } from '@server/types/reservation'
import { ReservetionType } from '@/types/reservation'
import { $reserve } from '@/lib/api'

export const createResevation = async (ids: UserSlotId): Promise<ReservetionType> => {
  try {
    const response = await $reserve.$post({ json: ids })
    const result = await response.json()

    if (!result.isSuccess) throw result
    return result
  } catch (error) {
    throw error
  }
}
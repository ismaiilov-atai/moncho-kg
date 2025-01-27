import { BookingIds } from '@server/types/reservation'
import { RescheduleType, ReservetionType } from '@/types/reservation'
import { $reserve } from '@/lib/api'

export const createResevation = async (ids: BookingIds): Promise<ReservetionType> => {
  try {
    const response = await $reserve.$post({ json: ids })
    const result = await response.json()
    if (!result.isSuccess) throw result
    return result
  } catch (error) {
    throw error
  }
}

export const rescheduleReservation = async ({bookingId, selectedTimeSlotId}:{bookingId: string, selectedTimeSlotId: string}): Promise<RescheduleType> => {
  try {
    const resp = await $reserve.$put({
      json: {
        from: bookingId,
        to: selectedTimeSlotId,
      },
    })
    const data = await resp.json()
    if (!data.isSuccess) throw data
    return data
  } catch (error) {
    throw error
  }

}
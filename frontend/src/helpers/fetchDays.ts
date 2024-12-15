import { ACCESS_TOKEN } from '@server/types/constants';
import { DayResponse } from '@/types/day-types';

const authHeader = {
  'Authorization': `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
}

export const fetchDays = async (): Promise<DayResponse> => {
  try {
    const resp = await fetch(`/api/days`, {
      method: 'GET',
      headers: authHeader,
    })
    const result = await resp.json();

    return result as DayResponse;
  } catch (error) {
    throw error;
  }
}
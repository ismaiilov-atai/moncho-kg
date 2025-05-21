import { api } from '@/lib/api'

export const fetchStats = async () => {
  const response = await api.stats.$get()
  return await response.json()
}
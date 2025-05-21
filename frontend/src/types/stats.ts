export interface HourlyStatsType {
  id: number
  hourId: string
  dayBelongTo: string | null
  hour: string
  stats: number
}
import { Cron } from 'croner'

export const cronerJobCreator = (pattern: string, callback: () => void) => {
  return new Cron(pattern, { timezone: 'Asia/Bishkek', maxRuns: 1 }, callback)
}
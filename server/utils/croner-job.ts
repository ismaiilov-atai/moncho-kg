import { Cron } from 'croner'

export const cronerJobCreator = (pattern: string, callback: () => void) => {
  return new Cron(pattern, { maxRuns: 1 }, callback);
}
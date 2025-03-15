import { MonitorCog, Moon, Sun } from 'lucide-react'

export const paths = [{ pathName: '' }]
export const locals = [
  { key: 'ky', flag: '🇰🇬' },
  { key: 'en', flag: '🇺🇸' },
  { key: 'ru', flag: '🇷🇺' },
]

export const themes = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: MonitorCog },
]

export const ONBOARDING_COMPLETED = 'onboarding-completed'
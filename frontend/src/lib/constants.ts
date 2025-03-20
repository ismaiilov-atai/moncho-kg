import { MonitorCog, Moon, Sun } from 'lucide-react'

export const PATHS = [
  { displayName: 'Home', pathName: '' },
  { displayName: 'Book a session', pathName: '/book-session' },
  { displayName: 'Login', pathName: '/login' },
  { displayName: 'Signup', pathName: '/signup' }
]
export const LOCALES = [
  { key: 'ky', flag: '🇰🇬', name: "Кыргыз" },
  { key: 'en', flag: '🇺🇸', name: "English" },
  { key: 'ru', flag: '🇷🇺', name: "Русский" },
]

export const THEMES = [
  { name: 'system', icon: MonitorCog, displayName: 'Auto' },
  { name: 'light', icon: Sun, displayName: 'Light' },
  { name: 'dark', icon: Moon, displayName: 'Dark' },
]

export const ONBOARDING_COMPLETED = 'onboarding-completed'
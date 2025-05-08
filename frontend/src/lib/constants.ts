import { MonitorCog, Moon, Sun } from 'lucide-react'

export const PATHS = [
  { displayName: 'Home', pathName: '/' },
  { displayName: 'Book a session', pathName: '/book-session' },
  { displayName: 'Login', pathName: '/login' },
  { displayName: 'Signup', pathName: '/signup' }
]
export const LOCALES = [
  { key: 'ky', flag: '🇰🇬', name: "Кыргыз" },
  { key: 'en-US', flag: '🇺🇸', name: "English" },
  { key: 'ru', flag: '🇷🇺', name: "Русский" },
]

export const THEMES = [
  { name: 'system', icon: MonitorCog, displayName: 'Auto' },
  { name: 'light', icon: Sun, displayName: 'Light' },
  { name: 'dark', icon: Moon, displayName: 'Dark' },
]

export const ONBOARDING_COMPLETED = 'onboarding-completed'
export const ONLY_ALPHABET_REGEX = /^[a-zA-Z]+([-'’][a-zA-Z]+)*(\s[a-zA-Z]+([-'’][a-zA-Z]+)*)*$/

export const REWARD_PROGRESS_COLORS: { [key: string]: string } = {
  light: '#B75D2A',
  dark: '#FFB97B',
  system: '#FFB97B',
  inactive_light: '#F0EEEE',
  inactive_dark: '#434342',
  inactive_system: '#434342',
}

export const SHAPE: React.CSSProperties = {
  strokeWidth: 20,
  strokeLinecap: 'round',
  fill: 'transparent',
}

export const DRAW = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5
    return {
      pathLength: 0.25,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}

export const IMAGE: React.CSSProperties = {
  maxWidth: '80vw',
}

export const VARIANTS = {
  enter: (direction: boolean) => ({
    x: direction ? -100 : 40,
    opacity: 0,
  }),
  exit: (direction: boolean) => ({
    zIndex: 0,
    x: direction ? 200 : -200,
    opacity: 0,
  }),
}

export const BOOK_SESSION_SEARCH_DEFAULT_VALUES = {
  session_id: '',
  guest: 0,
  slotId: '',
  userId: '',
};

export const RESCHEDULE_INTRO_COUNT = 'reschedule-intro-count' as const
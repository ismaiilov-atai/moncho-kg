import { driver, Popover, DriveStep } from "driver.js"
import { RESCHEDULE_INTRO_COUNT } from './constants'
import "driver.js/dist/driver.css"
import { t } from 'i18next'


const popovers: Popover[] = [
  {
    title: t('selct-day'),
    description: t('selct-day-description'),
    side: 'bottom',
  },
  {
    title: t("selct-slot"),
    description: t("selct-slot-description"),
    side: 'bottom',
    align: 'start'
  }
]

export const initDriverObj = (ids: string[] = [], extraSteps: DriveStep[] = []) => {

  const baseSteps = ids.map((id, index) => {
    return {
      element: `#_${id}`,
      popover: {
        ...popovers[index],
      }
    }
  })

  return driver({
    onDestroyed: () => {
      const introCount = Number(localStorage.getItem(RESCHEDULE_INTRO_COUNT))
      introCount < 3 && localStorage.setItem(RESCHEDULE_INTRO_COUNT, introCount > 0 ? String(introCount + 1) : String(1))
    },
    showProgress: true,
    steps: [...baseSteps, ...extraSteps]
  })
}






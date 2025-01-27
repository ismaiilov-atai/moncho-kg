import { driver, Popover, DriveStep } from "driver.js"
import "driver.js/dist/driver.css"


const popovers: Popover[] = [
  {
    title: "Select the day",
    description: "First you select the day you wish reschedule to.",
  },
  {
    title: "Select the slot",
    description: "And you can select the time slot you wish reschedule to.",
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
    showProgress: true,
    steps: [...baseSteps, ...extraSteps]
  })
}






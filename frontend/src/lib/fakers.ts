import { DaysType, SlotsType } from '@/types/day'

const fakeSlot: SlotsType = {
  slotId: 'random',
  isFull: false,
  time: '12-11-11',
  spaceLeft: 2,
}

const fakeDay: DaysType = {
  day: '2003-11-12',
  passed: false,
  dayId: 'random',
  slots: [],
}


export const fakeDays = Array(7).fill(fakeDay)
export const fakeSlots = Array(11).fill(fakeSlot)
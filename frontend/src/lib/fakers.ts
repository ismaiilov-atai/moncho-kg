import { DayType, SlotType } from '@/types/day-types';

const fakeSlot: SlotType = {
  slotId: 'random',
  isFull: false,
  time: '12-11-11',
  spaceLeft: 2,
};

const fakeDay: DayType = {
  day: '2003-11-12',
  passed: false,
  dayId: 'random',
  slots: [],
};


export const fakeDays = Array(7).fill(fakeDay);
export const fakeSlots = Array(11).fill(fakeSlot);
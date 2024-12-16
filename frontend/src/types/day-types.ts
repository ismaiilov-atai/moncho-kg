
export interface DayType {
  "dayId": string,
  "passed": boolean,
  "day": string,
  "slots": SlotType[]
}

export interface SlotType {
  "slotId": string,
  "isFull": boolean,
  "spaceLeft": number,
  "time": string,
  "dayBelongsTo"?: string
}

export interface DayResponse {
  success: boolean,
  days: DayType[];
}

export type HomeState = {
  slots: SlotType[]
  selectedDayId: string
}

export type HomeActions = {
  updateSlots: (slots: HomeState['slots']) => void;
  updateSelectedDayId: (dayId: HomeState['selectedDayId']) => void;
};
import { createFileRoute } from '@tanstack/react-router';
import { DayType, SlotType } from '@/types/day-types';
import { useSlotsStore } from '@/stores/slots-store';
import Home from '@/components/custom/main/Home';
import { daysQueryOptions } from '@/lib/api';
import { fakeDays } from '@/lib/fakers';

const findSlotsByDayId = (dayId: string, days: DayType[]): SlotType[] => {
  return days.find((day) => day.dayId === dayId)?.slots || days[0].slots;
};

export const Route = createFileRoute('/')({
  pendingComponent: () => <Home days={fakeDays} isPanding={true} />,
  loader: async ({ context: { queryClient } }) => {
    const { days } = await queryClient.ensureQueryData(daysQueryOptions);
    const { updateSelectedDayId, updateSlots, selectedDayId } =
      useSlotsStore.getState();

    updateSelectedDayId(selectedDayId || days[0].dayId);
    updateSlots(findSlotsByDayId(selectedDayId, days));
    return days;
  },
});

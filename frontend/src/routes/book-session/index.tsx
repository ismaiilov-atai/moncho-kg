import Days from '@/components/custom/main/Days';
import { daysQueryOptions } from '@/lib/api';
import { fakeDays } from '@/lib/fakers';
import { findSlotsByDayId } from '@/lib/utils';
import { useSlotsStore } from '@/stores/slots-store';
import { DaysType } from '@/types/day';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/book-session/')({
  loader: async ({ context: { queryClient } }) => {
    const days = await queryClient.ensureQueryData(daysQueryOptions);
    const { updateSelectedDayId, updateSlots, selectedDayId } =
      useSlotsStore.getState();
    updateSelectedDayId(selectedDayId || days[0].dayId);
    updateSlots(findSlotsByDayId(selectedDayId, days as DaysType[]));
    return days;
  },
  pendingComponent: () => <Days days={fakeDays} isPending />,
});

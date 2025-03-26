import { createFileRoute } from '@tanstack/react-router';
import { useSlotsStore } from '@/stores/slots-store';
import { BookSessionComponent } from './route.lazy';
import { findSlotsByDayId } from '@/lib/utils';
import { daysQueryOptions } from '@/lib/api';
import { DaysType } from '@/types/day';

export const Route = createFileRoute('/book-session')({
  loader: async ({ context: { queryClient } }) => {
    const days = await queryClient.ensureQueryData(daysQueryOptions);
    const { updateSelectedDayId, updateSlots, selectedDayId } =
      useSlotsStore.getState();
    updateSelectedDayId(selectedDayId || days[0].dayId);
    updateSlots(findSlotsByDayId(selectedDayId, days as DaysType[]));
    return days;
  },
  pendingComponent: () => <BookSessionComponent isPending={true} />,
});

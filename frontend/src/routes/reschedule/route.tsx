import { createFileRoute, redirect } from '@tanstack/react-router';
import { useRescheduleStore } from '@/stores/reschedule-store';
import { fetchDaysAndSetSelectedId } from '@/lib/utils';
import { RescheduleComponent } from './route.lazy';

export const Route = createFileRoute('/reschedule')({
  loader: async ({ context: { queryClient } }) => {
    return await fetchDaysAndSetSelectedId(queryClient);
  },
  pendingComponent: () => <RescheduleComponent isLoading={true} />,
  beforeLoad: () => {
    const { isRescheduling } = useRescheduleStore.getState();
    if (!isRescheduling)
      throw redirect({
        to: '/',
      });
  },
});

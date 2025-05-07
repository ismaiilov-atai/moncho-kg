import { createFileRoute, redirect } from '@tanstack/react-router';
import { fetchDaysAndSetSelectedId } from '@/lib/utils';
import { RescheduleComponent } from './route.lazy';
import { useRescheduleStore } from '@/stores/reschedule-store';

export const Route = createFileRoute('/reschedule')({
  loader: async ({ context: { queryClient } }) =>
    await fetchDaysAndSetSelectedId(queryClient),
  pendingComponent: () => <RescheduleComponent isLoading={true} />,
  beforeLoad: () => {
    const { isRescheduling } = useRescheduleStore.getState();
    if (!isRescheduling)
      throw redirect({
        to: '/',
      });
  },
});

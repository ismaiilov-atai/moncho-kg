import { createFileRoute } from '@tanstack/react-router';
import { fetchDaysAndSetSelectedId } from '@/lib/utils';
import { RescheduleComponent } from './route.lazy';

export const Route = createFileRoute('/reschedule')({
  loader: async ({ context: { queryClient } }) =>
    await fetchDaysAndSetSelectedId(queryClient),
  pendingComponent: () => <RescheduleComponent isLoading={true} />,
});

import { useUserStore } from '@/stores/user-store';
import { BookingType } from '@server/types/reservation';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/session/$sessionId')({
  loader: async ({ params }) => {
    const { reservations } = useUserStore.getState();
    const reservation = reservations.find(
      (item) => item.bookingId === params.sessionId
    ) as BookingType;
    return reservation;
  },
});
